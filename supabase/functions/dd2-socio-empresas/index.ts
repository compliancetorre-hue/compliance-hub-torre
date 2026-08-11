// ============================================================
// Edge Function: dd2-socio-empresas
// ============================================================
// Endpoint PÚBLICO (sem login) usado pelo Due Diligence 2 —
// descobre em quais outras empresas um sócio/administrador
// pesquisado também aparece no quadro societário.
//
// A Receita Federal (BrasilAPI/ReceitaWS/CNPJ.ws) só devolve dados
// por CNPJ — não existe busca "por nome de sócio" nessas APIs. O
// site cnpjtransparencia.com.br construiu esse índice reverso a
// partir da base aberta da Receita Federal (mesma fonte, só que
// pré-processada) e permite essa busca — mas não expõe API JSON
// nem libera CORS, só a página HTML normal. Por isso essa função
// existe: busca a página NO SERVIDOR (sem bloqueio de CORS, que é
// uma restrição só do navegador) e extrai os dados do HTML.
//
// Conferido o Termos de Uso deles (cnpjtransparencia.com.br/termos.php)
// em 28/07/2026: consulta pontual para due diligence é uso
// expressamente permitido ("verificar situação de empresas
// parceiras... due diligence"); só proíbem scraping em VOLUME que
// prejudique o site — o que não é o caso aqui (poucas consultas por
// investigação, não contínuo/em massa).
//
// Igual ao DOWEB (denuncia-als à parte): é HTML de um site de
// terceiro, não uma API contratual — se eles mudarem o layout, o
// parser para de funcionar (silenciosamente, devolvendo lista
// vazia, nunca erro pro usuário final).
//
// Deploy: supabase functions deploy dd2-socio-empresas --no-verify-jwt
// ============================================================

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'apikey, authorization, content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// O texto vem cru do HTML (ex: "TORRE &amp; CIA") — decodifica as
// entidades básicas antes de devolver, senão o front escapa de novo
// (escapeHtml) e vira "&amp;amp;" na tela.
function decodeEntidadesHtml(txt: string) {
  return txt
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// Extrai os campos de cada card ".empresa-item" no HTML da página de
// resultados. Estrutura observada (28/07/2026):
//   <div class="empresa-item"> <div> <a href="/cnpj/NNNN">NOME</a>
//     <div class="qual-tag">PAPEL · MUNICÍPIO/UF</div> </div>
//     <span class="badge-situacao">SITUAÇÃO</span> </div>
function extrairEmpresas(html: string) {
  const blocos = html.split('class="empresa-item"').slice(1);
  const empresas = [];
  for (const bloco of blocos) {
    const trecho = bloco.slice(0, 1000);
    // CNPJ alfanumérico (Receita Federal, regra nova de 2026): a raiz+ordem
    // pode ter letra A-Z além de número — \d+ sozinho perderia essas
    // empresas na extração.
    const mLink = trecho.match(/href="\/cnpj\/([0-9A-Za-z]+)"[^>]*>([^<]+)</);
    const mQual = trecho.match(/class="qual-tag"[^>]*>([^<]+)</);
    const mBadge = trecho.match(/class="badge-([a-z]+)"[^>]*>([^<]*)</i);
    if (!mLink) continue;
    const [, cnpj, nome] = mLink;
    const qualTexto = decodeEntidadesHtml((mQual?.[1] || '').trim());
    const [papel, municipioUf] = qualTexto.split('·').map((s) => s.trim());
    empresas.push({
      cnpj: cnpj.toUpperCase(),
      nome: decodeEntidadesHtml(nome.trim()),
      papel: papel || '',
      municipioUf: municipioUf || '',
      situacao: decodeEntidadesHtml((mBadge?.[2] || '').trim()),
    });
  }
  return empresas;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });

  const reqUrl = new URL(req.url);
  const nome = req.method === 'GET'
    ? reqUrl.searchParams.get('nome')
    : (await req.json().catch(() => ({})))?.nome;
  const uf = req.method === 'GET'
    ? (reqUrl.searchParams.get('uf') || '')
    : ((await req.json().catch(() => ({})))?.uf || '');

  if (!nome || String(nome).trim().length < 3) {
    return json({ error: 'Informe um nome com pelo menos 3 caracteres.' }, 400);
  }

  const alvoUrl = new URL('https://cnpjtransparencia.com.br/socio/');
  alvoUrl.searchParams.set('nome', String(nome).trim());
  if (uf) alvoUrl.searchParams.set('uf', String(uf).trim());

  try {
    const r = await fetch(alvoUrl.toString(), {
      headers: {
        'Accept': 'text/html',
        // User-Agent identificado de propósito — não é scraping disfarçado,
        // é uma consulta pontual de due diligence (uso permitido pelos
        // Termos de Uso deles).
        'User-Agent': 'ComplianceHubTorre-DueDiligence2/1.0 (uso pontual de due diligence; contato via app)',
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) return json({ error: 'HTTP ' + r.status, empresas: [] }, 200);
    const html = await r.text();
    const empresas = extrairEmpresas(html);
    return json({ empresas });
  } catch (e) {
    console.error('dd2-socio-empresas error:', (e as Error).message);
    return json({ error: 'Não foi possível consultar empresas vinculadas no momento.', empresas: [] }, 200);
  }
});
