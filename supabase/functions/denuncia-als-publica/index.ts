// ============================================================
// Edge Function: denuncia-als-publica
// ============================================================
// Endpoint PÚBLICO e ANÔNIMO — não exige login nem x-app-token,
// de propósito: quem escaneia o QR code do cartaz "Canal de
// Denúncia ALS" não está logado no sistema.
//
// Por segurança, esta função:
//  - só aceita POST;
//  - só permite INSERT (nunca SELECT/UPDATE/DELETE);
//  - usa a service_role key só para essa única operação, e só
//    grava os campos explicitamente validados abaixo — nenhum
//    campo enviado pelo cliente é gravado "cru";
//  - nunca devolve dados de outras denúncias (nem as que ela
//    mesma acabou de inserir, além do protocolo);
//  - gera o protocolo no servidor (o cliente não escolhe).
//
// Ela é independente da Edge Function "api" já existente — não
// modifica nem depende do código dela. O canal de denúncia
// original (tabela "denuncias") não é tocado por este arquivo.
//
// Deploy (Supabase CLI, a partir da raiz do projeto):
//   supabase functions deploy denuncia-als-publica --no-verify-jwt
//
// O --no-verify-jwt é necessário porque não há usuário logado;
// a validação de entrada é feita manualmente abaixo.
// ============================================================

import { createClient } from 'npm:@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'apikey, authorization, content-type',
};

const TIPOS_VALIDOS = [
  'Assédio moral',
  'Assédio sexual',
  'Discriminação',
  'Fraude ou desvio de valores',
  'Roubo/furto',
  'Irregularidades trabalhistas',
  'Conduta antiética',
];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== 'POST') return json({ error: 'Método não permitido' }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  // Honeypot anti-bot: campo escondido no formulário que um
  // usuário humano nunca preenche. Se vier preenchido, finge
  // sucesso (não avisa o bot) mas não grava nada.
  if (isNonEmptyString(body.website)) {
    return json({ protocolo: 'DN-ALS-0000' }, 201);
  }

  // ── Validação estrita — só os campos abaixo chegam ao banco.
  const errors: string[] = [];

  const tiposRaw = Array.isArray(body.tipos) ? body.tipos : [];
  const tipos = tiposRaw.filter((t) => TIPOS_VALIDOS.includes(t));
  if (tipos.length === 0) errors.push('Selecione ao menos um "Tipo de Denúncia".');

  const tipoOutro = isNonEmptyString(body.tipoOutro) ? body.tipoOutro.slice(0, 150) : null;

  const descricao = isNonEmptyString(body.descricao) ? body.descricao.trim() : '';
  if (descricao.length < 20) errors.push('"Descrição do Fato" deve ter ao menos 20 caracteres.');
  if (descricao.length > 8000) errors.push('"Descrição do Fato" excede o tamanho máximo.');

  const denunciado = isNonEmptyString(body.denunciado) ? body.denunciado.trim().slice(0, 150) : '';
  if (!denunciado) errors.push('"Nome do Denunciado?" é obrigatório.');

  if (body.consentimento !== true) errors.push('É necessário confirmar o consentimento.');

  const nome = isNonEmptyString(body.nome) ? body.nome.trim().slice(0, 150) : null;
  const telefone = isNonEmptyString(body.telefone) ? body.telefone.trim().slice(0, 30) : null;
  const email = isNonEmptyString(body.email) ? body.email.trim().slice(0, 150) : null;
  const setor = isNonEmptyString(body.setor) ? body.setor.trim().slice(0, 150) : null;
  const onde = isNonEmptyString(body.onde) ? body.onde.trim().slice(0, 200) : null;
  const horario = isNonEmptyString(body.horario) ? body.horario.trim().slice(0, 20) : null;
  const testemunhas = isNonEmptyString(body.testemunhas) ? body.testemunhas.trim().slice(0, 2000) : null;

  let quando: string | null = null;
  if (isNonEmptyString(body.quando)) {
    const d = new Date(body.quando);
    if (!isNaN(d.getTime())) quando = d.toISOString().split('T')[0];
  }

  if (errors.length > 0) return json({ error: errors.join(' ') }, 400);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Protocolo e id são definidos aqui, nunca pelo cliente.
  // Retry simples em caso de corrida rara na geração do protocolo.
  for (let tentativa = 0; tentativa < 3; tentativa++) {
    const { data: maxRow } = await supabase
      .from('denuncias_als')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextId = (maxRow?.id || 0) + 1;
    const ano = new Date().getFullYear();
    const proto = `DN-ALS-${ano}-${String(nextId).padStart(3, '0')}`;

    const { error: insertError } = await supabase.from('denuncias_als').insert({
      id: nextId,
      proto,
      nome, telefone, email, setor,
      tipos, tipo_outro: tipoOutro,
      descricao, denunciado, onde, quando, horario, testemunhas,
      consentimento: true,
      status: 'Aberta',
    });

    if (!insertError) return json({ protocolo: proto }, 201);

    // 23505 = unique_violation (proto ou id já usados por uma
    // gravação concorrente) — tenta de novo com o próximo id.
    if (insertError.code !== '23505') {
      console.error('denuncia-als-publica insert error:', insertError.message);
      return json({ error: 'Não foi possível registrar a denúncia. Tente novamente.' }, 500);
    }
  }

  return json({ error: 'Não foi possível registrar a denúncia. Tente novamente.' }, 500);
});
