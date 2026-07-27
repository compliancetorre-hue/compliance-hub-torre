// ============================================================
// Edge Function: denuncia-als-consulta
// ============================================================
// Endpoint PÚBLICO e ANÔNIMO — permite que o próprio denunciante
// (sem login) consulte, a partir do protocolo que recebeu, se já
// há resposta e qual o status da apuração.
//
// Exige DOIS fatores: protocolo + data de registro. O protocolo
// sozinho (formato previsível, DN-ALS-AAAA-NNN) não é suficiente —
// isso evitaria que alguém descubra/adivinhe protocolos alheios e
// veja o status/resposta de denúncias que não são suas. A data de
// registro só quem denunciou sabe (foi mostrada a ela no momento
// do envio).
//
// Por segurança, esta função devolve APENAS:
//   proto, status, criadoEm, prazoLimite, diasRestantes,
//   resposta (texto), respostaEm
// Nunca devolve: descrição do fato, denunciado, testemunhas,
// dados de identificação do denunciante, observações internas
// ou responsável pela apuração. Quem só tem o protocolo (um
// texto curto, não secreto) não pode usar esta função para
// vasculhar o conteúdo da denúncia de ninguém.
//
// Independente da Edge Function "api" já existente e da
// "denuncia-als-publica" — não altera nenhuma das duas.
//
// Deploy:
//   supabase functions deploy denuncia-als-consulta --no-verify-jwt
// ============================================================

import { createClient } from 'npm:@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'apikey, authorization, content-type',
};

const PRAZO_DIAS = 90;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
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

  const proto = typeof body.proto === 'string' ? body.proto.trim().toUpperCase() : '';
  const dataRegistro = typeof body.dataRegistro === 'string' ? body.dataRegistro.trim() : '';
  if (!proto || !dataRegistro) return json({ error: 'Informe o protocolo e a data de registro.' }, 400);
  if (isNaN(new Date(dataRegistro).getTime())) return json({ error: 'Data de registro inválida.' }, 400);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const { data, error } = await supabase
    .from('denuncias_als')
    .select('proto, status, criado_em, resposta_denunciante, resposta_em')
    .eq('proto', proto)
    .maybeSingle();

  if (error) {
    console.error('denuncia-als-consulta error:', error.message);
    return json({ error: 'Não foi possível consultar o protocolo agora. Tente novamente.' }, 500);
  }

  // Mensagem genérica em ambos os casos (protocolo inexistente OU
  // data errada) — não revela se o protocolo existe para quem não
  // sabe a data certa.
  const generico = () => json({ error: 'Protocolo ou data de registro não conferem.' }, 404);
  if (!data) return generico();

  const criadoEmDia = new Date(data.criado_em).toISOString().split('T')[0];
  const dataRegistroDia = new Date(dataRegistro).toISOString().split('T')[0];
  if (criadoEmDia !== dataRegistroDia) return generico();

  const criadoEm = new Date(data.criado_em);
  const prazoLimite = new Date(criadoEm.getTime() + PRAZO_DIAS * 86400000);
  const diasRestantes = Math.max(0, Math.ceil((prazoLimite.getTime() - Date.now()) / 86400000));

  return json({
    proto: data.proto,
    status: data.status,
    criadoEm: data.criado_em,
    prazoLimite: prazoLimite.toISOString(),
    diasRestantes,
    resposta: data.resposta_denunciante || null,
    respostaEm: data.resposta_em || null,
  }, 200);
});
