// ═══════════════════════════════════════════════════════
// DUE DILIGENCE 2 — KYC & MÍDIAS NEGATIVAS
// ═══════════════════════════════════════════════════════

function dd2HTML(){return `
<style>
.dd2-container{max-width:1200px;margin:0 auto;padding:20px}
.dd2-search{background:var(--primary);border-radius:12px;padding:20px 24px;margin-bottom:20px;color:#fff}
.dd2-search h2{font-size:1rem;margin-bottom:14px;opacity:.9}
.dd2-form-row{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;margin-bottom:14px}
.dd2-form-group{display:flex;flex-direction:column;gap:4px;min-width:140px}
.dd2-form-group label{font-size:.8rem;opacity:.8;font-weight:600;text-transform:uppercase;letter-spacing:.03em}
.dd2-form-group select,.dd2-form-group input{padding:8px 12px;border-radius:6px;border:none;font-size:.9rem;outline:none;color:var(--text)}
.dd2-form-group input{flex:1;min-width:200px}
.dd2-scope-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:16px}
.dd2-scope-item{display:flex;align-items:center;gap:6px;font-size:.82rem;cursor:pointer;padding:4px}
.dd2-scope-item input{cursor:pointer;accent-color:#00c49a}
.dd2-btn-search{background:#00c49a;color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:.95rem;font-weight:700;cursor:pointer;margin-top:10px;transition:opacity .2s}
.dd2-btn-search:hover{opacity:.85}
.dd2-btn-search:disabled{opacity:.5;cursor:not-allowed}
.dd2-progress{background:#fff;border-radius:12px;padding:20px 24px;margin-bottom:20px;display:none;border:1px solid #e2e8f0}
.dd2-prog-track{height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin:12px 0}
.dd2-prog-fill{height:100%;background:linear-gradient(90deg,#00c49a,#3b82f6);border-radius:4px;transition:width .5s ease}
.dd2-prog-steps{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.dd2-step{font-size:.75rem;padding:3px 10px;border-radius:12px;background:#e2e8f0;color:#64748b;transition:all .3s}
.dd2-step.active{background:#3b82f6;color:#fff}
.dd2-step.done{background:#22c55e;color:#fff}
.dd2-step.error{background:#ef4444;color:#fff}
.dd2-report{display:none}
.dd2-export-bar{display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:10px;padding:12px 20px;margin-bottom:16px;flex-wrap:wrap;gap:8px;border:1px solid #e2e8f0}
.dd2-export-meta{font-size:.82rem;color:#64748b}
.dd2-export-btns{display:flex;gap:8px}
.dd2-export-btns button{padding:7px 16px;border-radius:6px;border:none;cursor:pointer;font-size:.82rem;font-weight:600;transition:opacity .2s}
.dd2-export-btns button:hover{opacity:.8}
.dd2-btn-print{background:#0f2d4a;color:#fff}
.dd2-btn-pdf{background:#00c49a;color:#fff}
.dd2-score-section{display:flex;gap:20px;flex-wrap:wrap;align-items:center;background:#fff;border-radius:12px;padding:24px;margin-bottom:16px;border:1px solid #e2e8f0}
.dd2-gauge-wrap{text-align:center}
.dd2-gauge-circle{width:120px;height:120px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2rem;font-weight:800;border:8px solid #e2e8f0}
.dd2-gauge-circle.low{border-color:#22c55e;color:#22c55e}
.dd2-gauge-circle.medium{border-color:#f59e0b;color:#f59e0b}
.dd2-gauge-circle.high{border-color:#ef4444;color:#ef4444}
.dd2-gauge-label{font-size:.75rem;font-weight:700;margin-top:6px;text-transform:uppercase;letter-spacing:.05em}
.dd2-pillars{display:flex;gap:12px;flex-wrap:wrap;flex:1}
.dd2-pillar{flex:1;min-width:120px;background:#f0f4f8;border-radius:8px;padding:12px;text-align:center}
.dd2-pillar-icon{font-size:1.4rem}
.dd2-pillar-label{font-size:.72rem;color:#64748b;margin:4px 0}
.dd2-pillar-status{font-size:.8rem;font-weight:700}
.dd2-pillar-status.ok{color:#22c55e}
.dd2-pillar-status.warn{color:#f59e0b}
.dd2-pillar-status.bad{color:#ef4444}
.dd2-card{background:#fff;border-radius:12px;padding:20px 24px;margin-bottom:16px;border:1px solid #e2e8f0}
.dd2-card-title{font-size:1rem;font-weight:700;margin-bottom:16px;color:#0f2d4a;display:flex;align-items:center;gap:8px}
.dd2-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.dd2-field-item label{font-size:.72rem;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.04em;display:block;margin-bottom:2px}
.dd2-field-item span{font-size:.88rem;font-weight:600;color:#0f2d4a}
.dd2-table{width:100%;border-collapse:collapse;font-size:.82rem}
.dd2-table th{background:#0f2d4a;color:#fff;padding:8px 12px;text-align:left;font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.04em}
.dd2-table td{padding:8px 12px;border-bottom:1px solid #e2e8f0}
.dd2-table tr:last-child td{border-bottom:none}
.dd2-table tr:hover td{background:#f0f4f8}
.dd2-badge{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
.dd2-badge.ok{background:#dcfce7;color:#166534}
.dd2-badge.warn{background:#fef9c3;color:#854d0e}
.dd2-badge.danger{background:#fee2e2;color:#991b1b}
.dd2-badge.info{background:#dbeafe;color:#1e40af}
.dd2-badge.pep{background:#f3e8ff;color:#6b21a8}
.dd2-badge.ativo{background:#dbeafe;color:#1e40af}
.dd2-badge.passivo{background:#fee2e2;color:#991b1b}
.dd2-links-ext{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.dd2-link-ext{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;background:#f0f4f8;border:1px solid #e2e8f0;color:#0f2d4a;font-size:.78rem;text-decoration:none;transition:background .2s}
.dd2-link-ext:hover{background:#e2e8f0}
.dd2-loading{display:flex;align-items:center;justify-content:center;padding:32px;color:#64748b;gap:12px;font-size:.9rem}
.dd2-timeline{position:relative;padding-left:24px}
.dd2-timeline::before{content:'';position:absolute;left:8px;top:0;bottom:0;width:2px;background:#e2e8f0}
.dd2-tl-item{position:relative;margin-bottom:16px;padding-left:16px}
.dd2-tl-item::before{content:'';position:absolute;left:-8px;top:4px;width:12px;height:12px;border-radius:50%;background:#3b82f6;border:2px solid #fff;box-shadow:0 0 0 2px #e2e8f0}
.dd2-tl-item.danger::before{background:#ef4444}
.dd2-tl-item.warn::before{background:#f59e0b}
.dd2-tl-item.ok::before{background:#22c55e}
.dd2-tl-date{font-size:.72rem;color:#64748b;font-weight:600}
.dd2-tl-text{font-size:.85rem;font-weight:600;margin-top:2px}
.dd2-tl-sub{font-size:.78rem;color:#64748b;margin-top:1px}
.dd2-checklist{display:flex;flex-direction:column;gap:8px}
.dd2-chk-item{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;background:#f0f4f8;font-size:.85rem}
.dd2-chk-item.ok{border-left:4px solid #22c55e}
.dd2-chk-item.warn{border-left:4px solid #f59e0b}
.dd2-chk-item.bad{border-left:4px solid #ef4444}
@media(max-width:768px){.dd2-grid-3{grid-template-columns:1fr}.dd2-scope-grid{grid-template-columns:repeat(2,1fr)}.dd2-form-row{flex-direction:column}.dd2-score-section{flex-direction:column}}
@media print{.dd2-search,.dd2-export-btns{display:none!important}.dd2-card{break-inside:avoid;box-shadow:none}}
</style>
<div class="dd2-container">
  <div class="dd2-search">
    <h2>&#128269; Investigação Prévia — Due Diligence 2</h2>
    <div class="dd2-form-row">
      <div class="dd2-form-group">
        <label>Tipo</label>
        <select id="dd2-tipo" onchange="dd2OnTipoChange()">
          <option value="cnpj">&#127970; CNPJ</option>
          <option value="cpf">&#128100; CPF</option>
        </select>
      </div>
      <div class="dd2-form-group" style="flex:1;min-width:200px">
        <label>Documento</label>
        <input type="text" id="dd2-doc" placeholder="00.000.000/0001-00" maxlength="18" oninput="dd2FormatDoc(this)"/>
      </div>
      <div class="dd2-form-group" id="dd2-nome-group" style="flex:1;min-width:200px;display:none">
        <label>Nome completo (opcional)</label>
        <input type="text" id="dd2-nome" placeholder="Ex: Maria da Silva Souza"/>
      </div>
      <div class="dd2-form-group" style="max-width:180px">
        <label>Nível</label>
        <select id="dd2-nivel">
          <option value="basico">&#129001; Básico</option>
          <option value="intermediario" selected>&#129000; Intermediário</option>
          <option value="forense">&#128308; Forense</option>
        </select>
      </div>
    </div>
    <div class="dd2-scope-grid">
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-cadastral" checked> &#127963; Dados Cadastrais</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-fiscal" checked> &#128188; Situação Fiscal</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-judicial" checked> &#9878; Processos Judiciais</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-sancoes" checked> &#128171; Sanções e Restrições</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-pep" checked> &#127963; PEP</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-midia"> &#128240; Mídia Negativa</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-diarios" checked> &#128240; Diários Oficiais (DOU + Municipais)</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-bolsa" checked> &#128176; Bolsa Família (CPF)</label>
    </div>
    <div class="dd2-form-row" style="margin-top:-6px;margin-bottom:16px">
      <div class="dd2-form-group" style="max-width:160px">
        <label>Bolsa Família — Período de</label>
        <input type="month" id="dd2-bolsa-de" value="2025-06"/>
      </div>
      <div class="dd2-form-group" style="max-width:160px">
        <label>Período até</label>
        <input type="month" id="dd2-bolsa-ate" value="2026-07"/>
      </div>
    </div>
    <button class="dd2-btn-search" onclick="dd2Iniciar()">&#128269; Investigar</button>
  </div>

  <div class="dd2-progress" id="dd2-progress">
    <div style="font-weight:600;margin-bottom:8px">Consultando fontes oficiais...</div>
    <div class="dd2-prog-track"><div class="dd2-prog-fill" id="dd2-prog-fill" style="width:0%"></div></div>
    <div class="dd2-prog-steps" id="dd2-steps">
      <span class="dd2-step" id="dd2-step-cadastral">&#127963; Cadastral</span>
      <span class="dd2-step" id="dd2-step-fiscal">&#128188; Fiscal</span>
      <span class="dd2-step" id="dd2-step-judicial">&#9878; Judicial</span>
      <span class="dd2-step" id="dd2-step-sancoes">&#128171; Sanções</span>
      <span class="dd2-step" id="dd2-step-pep">&#127963; PEP</span>
      <span class="dd2-step" id="dd2-step-midia">&#128240; Mídia</span>
      <span class="dd2-step" id="dd2-step-diarios">&#128240; Diários</span>
      <span class="dd2-step" id="dd2-step-bolsa">&#128176; Bolsa Família</span>
      <span class="dd2-step" id="dd2-step-analise">&#128202; Análise</span>
    </div>
  </div>

  <div class="dd2-report" id="dd2-report">
    <div class="dd2-export-bar">
      <div class="dd2-export-meta" id="dd2-export-meta"></div>
      <div class="dd2-export-btns">
        <button class="dd2-btn-print" onclick="window.print()">&#128438; Imprimir</button>
        <button class="dd2-btn-pdf" onclick="window.print()">&#128229; Exportar PDF</button>
      </div>
    </div>
    <div class="dd2-score-section" id="dd2-score-section">
      <div class="dd2-gauge-wrap">
        <div class="dd2-gauge-circle" id="dd2-gauge">--</div>
        <div class="dd2-gauge-label" id="dd2-gauge-label">Calculando...</div>
      </div>
      <div class="dd2-pillars" id="dd2-pillars"></div>
    </div>
    <div class="dd2-card" id="dd2-sec-cadastral">
      <div class="dd2-card-title">&#127963; Dados Cadastrais</div>
      <div id="dd2-cadastral-content"><div class="dd2-loading">&#9203; Consultando Receita Federal...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-qsa" style="display:none">
      <div class="dd2-card-title">&#128101; Quadro Societário (QSA)</div>
      <div id="dd2-qsa-content"></div>
    </div>
    <div class="dd2-card" id="dd2-sec-fiscal">
      <div class="dd2-card-title">&#128188; Situação Fiscal</div>
      <div id="dd2-fiscal-content"><div class="dd2-loading">&#9203; Verificando situação fiscal...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-judicial">
      <div class="dd2-card-title">&#9878; Processos Judiciais (DJEN — CNJ)</div>
      <div id="dd2-judicial-content"><div class="dd2-loading">&#9203; Consultando o Diário de Justiça Eletrônico Nacional...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-sancoes">
      <div class="dd2-card-title">&#128171; Sanções e Restrições (CEIS, CNEP, Leniência, CEPIM, CEAF, Internacional)</div>
      <div id="dd2-sancoes-content"><div class="dd2-loading">&#9203; Consultando Portal da Transparência...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-pep">
      <div class="dd2-card-title">&#127963; Pessoas Expostas Politicamente (PEP)</div>
      <div id="dd2-pep-content"><div class="dd2-loading">&#9203; Consultando base de PEPs...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-midia" style="display:none">
      <div class="dd2-card-title">&#128240; Mídia Negativa</div>
      <div id="dd2-midia-content"><div class="dd2-loading">&#9203; Buscando notícias negativas...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-diarios">
      <div class="dd2-card-title">&#128240; Diários Oficiais (DOU + Querido Diário)</div>
      <div id="dd2-diarios-content"><div class="dd2-loading">&#9203; Consultando o DOU e diários oficiais de mais de 350 municípios...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-bolsa" style="display:none">
      <div class="dd2-card-title">&#128176; Bolsa Família</div>
      <div id="dd2-bolsa-content"><div class="dd2-loading">&#9203; Consultando Portal da Transparência...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-timeline">
      <div class="dd2-card-title">&#128197; Linha do Tempo</div>
      <div class="dd2-timeline" id="dd2-timeline-content"></div>
    </div>
    <div class="dd2-card">
      <div class="dd2-card-title">&#9989; Checklist de Qualidade</div>
      <div class="dd2-checklist" id="dd2-checklist-content"></div>
    </div>
  </div>
</div>
`;}


// ═══════════════════════════════════════════════════════
// DUE DILIGENCE 2 — JAVASCRIPT
// ═══════════════════════════════════════════════════════

// A chave do Portal da Transparência é PESSOAL e NUNCA deve existir no
// cliente (ficaria visível a qualquer visitante via "Ver código-fonte"). As
// consultas passam pela Edge Function, que guarda as chaves como secrets do
// lado do servidor — ver rota /portal/:endpoint no backend.
//
// Processos Judiciais NÃO usa a API pública do DataJud CNJ: o índice público
// do DataJud não expõe nome nem CPF/CNPJ das partes de um processo (só
// metadados — número, classe, órgão julgador, movimentações), então nunca é
// possível localizar processos de uma pessoa/empresa a partir do documento
// por ali. Em vez disso, usamos o DJEN (Diário de Justiça Eletrônico
// Nacional, comunicaapi.pje.jus.br) — API pública do CNJ que agrega
// citações, intimações e editais de tribunais de todo o país e permite
// buscar por nome da parte (nomeParte) ou por texto livre (útil pra achar o
// CPF/CNPJ escrito no teor da comunicação). É pública, sem chave, com CORS
// liberado — por isso é chamada direto do navegador, sem Edge Function.
// Tem rate limit de 20 requisições por janela por IP (ver dd2FetchDJEN).
function dd2PortalHeaders(){
  return { 'x-app-token': (typeof getAppToken==='function'?getAppToken():'') };
}
function dd2PortalUrl(rota, params){
  return `${EDGE_URL}/portal/${rota}?${params}`;
}

let dd2JudicialData = [];
let dd2CadastralData = null;
let dd2SancoesData = {ceis:[],cnep:[],leniencia:[],cepim:[],ceaf:[],internacional:[]};
let dd2PepData = [];
let dd2PepFalhou = false;
let dd2MidiaData = [];
let dd2MidiaFalhou = false;
let dd2DiariosData = [];
let dd2BolsaData = [];

function dd2FormatDoc(input){
  const tipo = document.getElementById('dd2-tipo').value;
  let v = input.value.replace(/\D/g,'');
  if(tipo==='cnpj'){
    v=v.substring(0,14);
    v=v.replace(/(\d{2})(\d)/,'$1.$2');
    v=v.replace(/(\d{3})(\d)/,'$1.$2');
    v=v.replace(/(\d{3})(\d)/,'$1/$2');
    v=v.replace(/(\d{4})(\d)/,'$1-$2');
  } else {
    v=v.substring(0,11);
    v=v.replace(/(\d{3})(\d)/,'$1.$2');
    v=v.replace(/(\d{3})(\d)/,'$1.$2');
    v=v.replace(/(\d{3})(\d)/,'$1-$2');
  }
  input.value=v;
}

// Mostra o campo "Nome completo" só para CPF — não existe API pública que
// faça CPF→nome (LGPD), então sem esse campo a busca de processos (DJEN) e
// de mídia negativa fica restrita a casar o CPF cru no texto livre, o que
// tem cobertura bem menor que buscar pelo nome da parte.
function dd2OnTipoChange(){
  dd2FormatDoc(document.getElementById('dd2-doc'));
  const grp=document.getElementById('dd2-nome-group');
  if(grp) grp.style.display=document.getElementById('dd2-tipo').value==='cpf'?'flex':'none';
}

function dd2SetStep(id,state){
  const el=document.getElementById('dd2-step-'+id);
  if(!el)return;
  el.className='dd2-step '+state;
}

function dd2SetProgress(pct){
  const el=document.getElementById('dd2-prog-fill');
  if(el)el.style.width=pct+'%';
}

async function dd2Iniciar(){
  const doc=document.getElementById('dd2-doc').value.replace(/\D/g,'');
  const tipo=document.getElementById('dd2-tipo').value;
  if(doc.length<11){alert('Informe um documento válido.');return;}
  // Só relevante pra CPF — pra CNPJ a razão social já vem da Receita Federal.
  const nomeManual=tipo==='cpf'?(document.getElementById('dd2-nome')?.value||'').trim():'';
  const scCad=document.getElementById('dd2-sc-cadastral').checked;
  const scFis=document.getElementById('dd2-sc-fiscal').checked;
  const scJud=document.getElementById('dd2-sc-judicial').checked;
  const scSan=document.getElementById('dd2-sc-sancoes').checked;
  const scPep=document.getElementById('dd2-sc-pep').checked;
  const scMid=document.getElementById('dd2-sc-midia').checked;
  const scDiarios=document.getElementById('dd2-sc-diarios').checked;
  const scBolsa=document.getElementById('dd2-sc-bolsa').checked;
  document.getElementById('dd2-progress').style.display='block';
  document.getElementById('dd2-report').style.display='none';
  document.getElementById('dd2-sec-midia').style.display=scMid?'block':'none';
  document.getElementById('dd2-sec-bolsa').style.display=scBolsa?'block':'none';
  dd2SetProgress(5);
  dd2JudicialData=[];dd2CadastralData=null;dd2SancoesData={ceis:[],cnep:[],leniencia:[],cepim:[],ceaf:[],internacional:[]};dd2PepData=[];dd2PepFalhou=false;dd2MidiaData=[];dd2MidiaFalhou=false;dd2DiariosData=[];dd2BolsaData=[];
  const tasks=[];

  // Failsafe: se alguma chamada travar inesperadamente, libera a tela mesmo assim
  let failsafeAcionado=false;
  const failsafe=setTimeout(()=>{
    failsafeAcionado=true;
    console.warn('DD2: failsafe acionado');
    document.getElementById('dd2-progress').style.display='none';
    document.getElementById('dd2-report').style.display='block';
  },35000);

  try {
  // cadastralPromise nunca rejeita (erros já tratados dentro) — permite que
  // Judicial e PEP aguardem os dados cadastrais (nome + sócios) sem correr
  // na frente da resposta da Receita Federal, como acontecia antes.
  let cadastralPromise=Promise.resolve(null);
  if(scCad&&tipo==='cnpj'){
    dd2SetStep('cadastral','active');
    cadastralPromise=dd2BuscarCNPJ(doc)
        .then(d=>{
          dd2CadastralData=d;
          dd2SetStep('cadastral','done');
          dd2SetProgress(20);
          dd2RenderCadastral(d);
          dd2RenderFiscal(d);
          return d;
        }).catch(()=>{
          dd2SetStep('cadastral','error');
          dd2RenderCadastral(null);
          dd2RenderFiscal(null);
          return null;
        });
    tasks.push(cadastralPromise);
  } else {
    dd2SetStep('cadastral','done');dd2SetProgress(20);
    document.getElementById('dd2-cadastral-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta cadastral disponível apenas para CNPJ.</p>';
    document.getElementById('dd2-fiscal-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta fiscal disponível apenas para CNPJ.</p>';
  }
  // djenItemsPromise e diariosPromise ficam disponíveis fora do if pra
  // alimentar a resolução automática de nome por CPF logo abaixo, mesmo
  // que os cards já tenham sido renderizados nesse meio-tempo.
  let djenItemsPromise=Promise.resolve([]);
  if(scJud){
    dd2SetStep('judicial','active');
    djenItemsPromise=cadastralPromise.then(cad=>{
        const nome=cad?.razao||nomeManual||'';
        const socios=cad?.socios||[];
        return dd2BuscarProcessosDJEN(nome,doc,tipo,socios).then(res=>{
          dd2JudicialData=res.items;
          dd2RenderJudicial(res,nome,doc,tipo,socios);
          dd2SetStep('judicial','done');dd2SetProgress(50);
          return res.items;
        });
      }).catch(()=>{
        dd2SetStep('judicial','error');
        dd2JudicialData=[];
        document.getElementById('dd2-judicial-content').innerHTML=`<p style="color:#ef4444;margin-bottom:10px">⚠️ Não foi possível consultar o DJEN automaticamente no momento.</p>${dd2LinksManuaisHTML(dd2CadastralData?.razao||nomeManual||'',doc,tipo,dd2CadastralData?.socios||[])}`;
        return [];
      });
    tasks.push(djenItemsPromise);
  } else {
    dd2SetStep('judicial','done');
    document.getElementById('dd2-judicial-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta judicial não selecionada.</p>';
  }
  let diariosPromise=Promise.resolve([]);
  if(scDiarios){
    dd2SetStep('diarios','active');
    diariosPromise=cadastralPromise.then(cad=>{
        const nome=cad?.razao||nomeManual||'';
        return dd2BuscarDiarios(nome,doc,tipo);
      }).then(res=>{
        dd2DiariosData=res.items;
        dd2RenderDiarios(res);
        dd2SetStep('diarios','done');
        return res.items;
      }).catch(()=>{
        dd2SetStep('diarios','error');
        dd2DiariosData=[];
        dd2RenderDiarios(null);
        return [];
      });
    tasks.push(diariosPromise);
  } else {
    dd2SetStep('diarios','done');
    document.getElementById('dd2-diarios-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta de diários oficiais não selecionada.</p>';
  }
  // Só faz sentido tentar achar o nome quando é CPF e o usuário não
  // informou um — pra CNPJ a razão social já vem da Receita Federal, e se
  // o usuário já digitou o nome não há o que descobrir.
  let nomeResolvidoPromise=Promise.resolve('');
  if(tipo==='cpf'&&!nomeManual){
    nomeResolvidoPromise=Promise.all([djenItemsPromise,diariosPromise]).then(([djenItems,diarioItems])=>{
      const docFmt=dd2FmtDoc(doc,tipo);
      const candidato=dd2CandidatoNomePorCPF({djen:djenItems,diarios:diarioItems},docFmt);
      dd2RenderNomeIdentificado(candidato);
      if(candidato){
        const campo=document.getElementById('dd2-nome');
        if(campo&&!campo.value)campo.value=candidato.nome;
        return candidato.nome;
      }
      return '';
    }).catch(()=>{dd2RenderNomeIdentificado(null);return '';});
  }
  if(scSan){
    dd2SetStep('sancoes','active');
    tasks.push(
      // allSettled (em vez de all) pra que a falha de UMA base não mascare
      // o resultado real da outra — mesmo cuidado do Bolsa Família, ver
      // dd2FetchBolsaFamilia. Um HTTP não-OK agora vira rejeição explícita,
      // não um "[]" silencioso que se confunde com "nenhuma sanção".
      // Leniência e CEPIM só existem pra pessoa jurídica; CEAF só pra
      // pessoa física — pedidos pro tipo errado nem saem do ar.
      Promise.all([cadastralPromise,nomeResolvidoPromise]).then(([cad,nomeResolvido])=>{
        const nomeParaSancao=cad?.razao||nomeManual||nomeResolvido||'';
        const chamar=(rota,params)=>fetch(dd2PortalUrl(rota,params+'&pagina=1'),{headers:dd2PortalHeaders(),signal:AbortSignal.timeout(10000)}).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json();});
        return Promise.allSettled([
          chamar('ceis','codigoSancionado='+doc),
          chamar('cnep','codigoSancionado='+doc),
          tipo==='cnpj'?chamar('acordos-leniencia','cnpjSancionado='+doc):Promise.resolve([]),
          tipo==='cnpj'?chamar('cepim','cnpjSancionado='+doc):Promise.resolve([]),
          tipo==='cpf'?chamar('ceaf','cpfSancionado='+doc):Promise.resolve([]),
          nomeParaSancao?dd2FetchSanctionsNetwork(nomeParaSancao):Promise.resolve([]),
        ]).then(resultados=>[resultados,nomeParaSancao]);
      }).then(([[ceisRes,cnepRes,lenRes,cepimRes,ceafRes,intRes],nomeParaSancao])=>{
        const pega=r=>r.status==='fulfilled'&&Array.isArray(r.value)?r.value:[];
        dd2SancoesData={
          ceis:pega(ceisRes),cnep:pega(cnepRes),leniencia:pega(lenRes),cepim:pega(cepimRes),ceaf:pega(ceafRes),
          internacional:dd2FiltrarRuidoSancoesIntl(pega(intRes),nomeParaSancao),
          ceisFalhou:ceisRes.status==='rejected',cnepFalhou:cnepRes.status==='rejected',
        };
        dd2SetStep('sancoes',(ceisRes.status==='rejected'&&cnepRes.status==='rejected')?'error':'done');dd2SetProgress(65);
        dd2RenderSancoes(dd2SancoesData);
      })
    );
  } else {
    dd2SetStep('sancoes','done');
    document.getElementById('dd2-sancoes-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta de sanções não selecionada.</p>';
  }
  if(scPep){
    dd2SetStep('pep','active');
    tasks.push(
      cadastralPromise.then(cad=>dd2FetchPep(cad?.razao||'',tipo==='cpf'?doc:'')).then(d=>{
        dd2PepData=d;dd2PepFalhou=false;dd2SetStep('pep','done');dd2SetProgress(78);
        dd2RenderPep(d,false);
      }).catch(()=>{dd2SetStep('pep','error');dd2PepData=[];dd2PepFalhou=true;dd2RenderPep([],true);})
    );
  } else {
    dd2SetStep('pep','done');
    document.getElementById('dd2-pep-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta PEP não selecionada.</p>';
  }
  if(scMid){
    dd2SetStep('midia','active');
    tasks.push(
      Promise.all([cadastralPromise,nomeResolvidoPromise]).then(([cad,nomeResolvido])=>{
        const nome=cad?.razao||nomeManual||nomeResolvido||doc;
        const docFmt=dd2FmtDoc(doc,tipo);
        return dd2BuscarMidiaNegativa(nome,docFmt).then(items=>{
          dd2MidiaData=items;dd2MidiaFalhou=false;dd2SetStep('midia','done');dd2SetProgress(88);
          dd2RenderMidia(items,nome,docFmt,false);
        }).catch(()=>{
          dd2SetStep('midia','error');
          dd2MidiaData=[];dd2MidiaFalhou=true;
          dd2RenderMidia([],nome,docFmt,true);
        });
      })
    );
  } else { dd2SetStep('midia','done'); }
  if(scBolsa&&tipo==='cpf'){
    dd2SetStep('bolsa','active');
    tasks.push(
      dd2FetchBolsaFamilia(doc).then(res=>{
        dd2BolsaData=res.items;dd2SetStep('bolsa','done');dd2SetProgress(92);
        dd2RenderBolsaFamilia(res);
      }).catch(()=>{dd2SetStep('bolsa','error');dd2RenderBolsaFamilia(null);})
    );
  } else if(scBolsa){
    dd2SetStep('bolsa','done');
    document.getElementById('dd2-bolsa-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta de Bolsa Família disponível apenas para CPF.</p>';
  } else {
    dd2SetStep('bolsa','done');
  }
  await Promise.allSettled(tasks);
  dd2SetStep('analise','active');
  dd2SetProgress(95);
  dd2RenderScore();
  dd2RenderTimeline();
  dd2RenderChecklist();
  dd2SetStep('analise','done');
  dd2SetProgress(100);
  const now=new Date();
  document.getElementById('dd2-export-meta').textContent='Relatório gerado em '+now.toLocaleDateString('pt-BR')+' '+now.toLocaleTimeString('pt-BR')+' — '+doc;
  } catch(e) {
    console.error('dd2Iniciar erro:', e);
  } finally {
    clearTimeout(failsafe);
    if(!failsafeAcionado){
      document.getElementById('dd2-progress').style.display='none';
      document.getElementById('dd2-report').style.display='block';
    }
  }
}

// Busca CNPJ direto nas APIs públicas (mesmo padrão do Due Diligence 1),
// com fallback entre provedores e normalização unificada dos campos.
async function dd2BuscarCNPJ(doc){
  const apis=[
    {name:'BrasilAPI',url:`https://brasilapi.com.br/api/cnpj/v1/${doc}`},
    {name:'ReceitaWS',url:`https://www.receitaws.com.br/v1/cnpj/${doc}`},
    {name:'CNPJ.ws',url:`https://publica.cnpj.ws/cnpj/${doc}`}
  ];
  let found=null;
  for(const a of apis){ found=await ddTryApi(a.url,a.name,null); if(found) break; }
  if(!found) throw new Error('CNPJ APIs indisponíveis');
  const norm=ddNorm(found.data,found.api);
  if(!norm) throw new Error('Falha ao normalizar dados do CNPJ');
  return norm;
}

async function dd2FetchPep(nome,cpf){
  if(!nome&&!cpf)return[];
  // Busca exata por CPF quando disponível (muito mais precisa que por nome)
  const qs=cpf?('cpf='+cpf):('nome='+encodeURIComponent(nome.split(' ').slice(0,3).join(' ')));
  const r=await fetch(dd2PortalUrl('peps',qs+'&pagina=1'),{headers:dd2PortalHeaders(),signal:AbortSignal.timeout(10000)});
  // Lança em vez de devolver [] silenciosamente — um HTTP de erro (ex.: 401
  // de token expirado) não pode virar "não é PEP" na tela, senão o score de
  // risco nunca reflete uma falha real de verificação.
  if(!r.ok)throw new Error('HTTP '+r.status);
  const d=await r.json();
  return Array.isArray(d)?d:[];
}

// Consulta se o CPF/NIS recebeu parcelas do Bolsa Família (Portal da Transparência).
// A API exige um mês de referência (AAAAMM) por chamada — o período é definido
// pelos campos "Período de" / "Período até" do formulário (padrão: 06/2025 a 07/2026).
function dd2BolsaMeses(){
  const de=document.getElementById('dd2-bolsa-de')?.value||'2025-06';
  const ate=document.getElementById('dd2-bolsa-ate')?.value||'2026-07';
  let [ano,mes]=de.split('-').map(Number);
  const [anoFim,mesFim]=ate.split('-').map(Number);
  const meses=[];
  let guardaChuva=0; // proteção contra período invertido/gigante
  while((ano<anoFim || (ano===anoFim && mes<=mesFim)) && guardaChuva<60){
    meses.push(ano+String(mes).padStart(2,'0'));
    mes++;
    if(mes>12){mes=1;ano++;}
    guardaChuva++;
  }
  return meses;
}
// Consulta as DUAS bases: o Bolsa Família antigo (descontinuado em 2021) e o
// Novo Bolsa Família (programa atual, desde 2023) — um pagamento recente só
// aparece na segunda base, então checamos as duas pra não perder nenhuma.
// Uma chamada isolada falhar não derruba a consulta toda (rede instável, um
// mês sem dados etc.) — só se TODAS falharem é que reportamos erro de verdade,
// pra não mascarar uma falha real (chave errada, rota fora do ar) como "não recebe".
// Retorna { items, baseAntigaFalhou, baseNovaFalhou } — falha de UMA base
// inteira é reportada separadamente, pra não virar um falso "não recebe".
// Resolve o NIS real da pessoa a partir do CPF (a base "novo" exige o NIS,
// que normalmente é um número diferente do CPF — buscar pelo CPF direto
// nessa base praticamente nunca encontra nada). Antes, qualquer falha na
// chamada (401 de chave/rate-limit, timeout, etc.) virava silenciosamente
// "NIS não encontrado" — indistinguível de "consultei e essa pessoa
// realmente não tem NIS cadastrado". Agora devolve {nis, falhou} pra a UI
// mostrar a mensagem certa em cada caso.
async function dd2ResolverNis(cpf){
  try{
    const r=await fetch(dd2PortalUrl('pessoa-fisica','cpf='+cpf),{headers:dd2PortalHeaders(),signal:AbortSignal.timeout(10000)});
    if(!r.ok){
      const corpo=await r.text().catch(()=>'(sem corpo)');
      console.warn('[DD2-DEBUG] pessoa-fisica cpf='+cpf,'status:',r.status,'corpo:',corpo);
      return {nis:null,falhou:true};
    }
    const d=await r.json();
    const registro=Array.isArray(d)?d[0]:d;
    console.warn('[DD2-DEBUG] pessoa-fisica cpf='+cpf,'status:',r.status,'resposta:',JSON.stringify(d));
    return {nis:registro?.nis||null,falhou:false};
  }catch(e){ console.warn('[DD2-DEBUG] pessoa-fisica cpf='+cpf,'excecao:',e.message); return {nis:null,falhou:true}; }
}

// Dispara as chamadas em lotes pequenos, com um intervalo entre lotes, e
// tenta de novo uma vez só os índices que falharam — 14 meses × 2 bases é
// até 28 chamadas de uma vez só pro Bolsa Família (mais tudo que o resto do
// Due Diligence 2 dispara em paralelo), o que na prática estoura o rate
// limit do Portal da Transparência com frequência. Isso é o que fazia a
// base do Novo Bolsa Família falhar parcialmente mesmo quando a pessoa
// realmente não tinha nada a esconder — reduzir a concorrência e tentar de
// novo os que falharam recupera a maioria dos casos de rate-limit
// transitório sem precisar aumentar timeout nem mudar o resultado.
async function dd2ChamarEmLotes(fns,tamanhoLote=4,intervaloMs=350){
  const resultados=[];
  for(let i=0;i<fns.length;i+=tamanhoLote){
    const lote=fns.slice(i,i+tamanhoLote).map(fn=>fn());
    resultados.push(...await Promise.allSettled(lote));
    if(i+tamanhoLote<fns.length) await new Promise(r=>setTimeout(r,intervaloMs));
  }
  return resultados;
}

async function dd2ExecutarComRetry(fns){
  const resultados=await dd2ChamarEmLotes(fns);
  const pendentes=resultados.map((r,i)=>r.status==='rejected'?i:-1).filter(i=>i>=0);
  if(pendentes.length){
    await new Promise(r=>setTimeout(r,700));
    const retry=await dd2ChamarEmLotes(pendentes.map(i=>fns[i]));
    pendentes.forEach((idxOriginal,j)=>{ resultados[idxOriginal]=retry[j]; });
  }
  return resultados;
}

async function dd2FetchBolsaFamilia(cpf){
  const meses=dd2BolsaMeses();
  // DEBUG TEMPORÁRIO — remover depois de diagnosticar a falha do Novo Bolsa
  // Família. Loga status e corpo de erro de cada chamada no console.
  const chamar=(rota,params)=>fetch(dd2PortalUrl(rota,params),{headers:dd2PortalHeaders(),signal:AbortSignal.timeout(10000)})
    .then(async r=>{
      if(!r.ok){
        const corpo=await r.text().catch(()=>'(sem corpo)');
        console.warn('[DD2-DEBUG]',rota,params,'status:',r.status,'corpo:',corpo);
        throw new Error('HTTP '+r.status);
      }
      return r.json();
    })
    .then(d=>Array.isArray(d)?d:[]);

  const {nis,falhou:nisFalhou}=await dd2ResolverNis(cpf);
  const antigasFns=meses.map(anoMes=>()=>chamar('bolsa-familia','codigo='+cpf+'&anoMesReferencia='+anoMes+'&pagina=1'));
  const novasFns=nis
    ? meses.map(anoMes=>()=>chamar('bolsa-familia-novo','nis='+nis+'&anoMesReferencia='+anoMes+'&pagina=1').then(d=>d.map(item=>({...item,_novo:true}))))
    : [];

  const [resAntigas,resNovas]=await Promise.all([dd2ExecutarComRetry(antigasFns),dd2ExecutarComRetry(novasFns)]);
  const okAntigas=resAntigas.filter(r=>r.status==='fulfilled');
  const okNovas=resNovas.filter(r=>r.status==='fulfilled');
  // Falha PARCIAL (algumas chamadas de mês individuais falharam, não todas)
  // já é motivo pra avisar que o resultado pode estar incompleto — a busca
  // dispara até ~28 chamadas simultâneas (1 por mês × 2 bases), então um
  // rate-limit parcial no meio do caminho antes só era mascarado como "sem
  // parcelas nesses meses" em vez de reportado como falha.
  const antigasParcialFalhou=okAntigas.length<meses.length;
  const novasParcialFalhou=!!nis&&okNovas.length<meses.length;

  // Zero sucesso nas DUAS bases é falha de verdade — antes só disparava
  // quando o NIS tinha sido resolvido, deixando escapar em silêncio o caso
  // (mais comum) de resolução de NIS falhar E a base antiga falhar junto.
  if(okAntigas.length===0 && okNovas.length===0 && meses.length>0) throw new Error('Todas as consultas de Bolsa Família falharam');

  return {
    items:[...okAntigas.flatMap(r=>r.value), ...okNovas.flatMap(r=>r.value)],
    baseAntigaFalhou:antigasParcialFalhou,
    baseNovaFalhou:novasParcialFalhou,
    nisNaoEncontrado:!nis&&!nisFalhou,
    nisFalhouAoConsultar:nisFalhou,
  };
}

function dd2RenderCadastral(d){
  const el=document.getElementById('dd2-cadastral-content');
  if(!d){el.innerHTML='<p style="color:#ef4444">Não foi possível obter dados cadastrais (APIs indisponíveis no momento).</p>';return;}
  const sit=d.situacao||'—';
  const sitOk=(sit.toUpperCase().includes('ATIVA')||sit.toUpperCase().includes('REGULAR'));
  el.innerHTML=`<div class="dd2-grid-3">
    <div class="dd2-field-item"><label>Razão Social</label><span>${escapeHtml(d.razao)||'—'}</span></div>
    <div class="dd2-field-item"><label>Situação Cadastral</label><span><span class="dd2-badge ${sitOk?'ok':'danger'}">${escapeHtml(sit)}</span></span></div>
    <div class="dd2-field-item"><label>Data de Abertura</label><span>${escapeHtml(d.abertura)||'—'}</span></div>
    <div class="dd2-field-item"><label>Natureza Jurídica</label><span>${escapeHtml(d.natureza)||'—'}</span></div>
    <div class="dd2-field-item"><label>Porte</label><span>${escapeHtml(d.porte)||'—'}</span></div>
    <div class="dd2-field-item"><label>Capital Social</label><span>${escapeHtml(d.capital)||'—'}</span></div>
    <div class="dd2-field-item"><label>CNAE Principal</label><span>${escapeHtml(d.cnae_pri?.desc)||'—'}</span></div>
    <div class="dd2-field-item" style="grid-column:1/-1"><label>Endereço</label><span>${escapeHtml(d.endereco)||'—'}</span></div>
  </div>`;
  if(d.socios?.length){
    document.getElementById('dd2-sec-qsa').style.display='block';
    document.getElementById('dd2-qsa-content').innerHTML=`<div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th>Nome</th><th>Qualificação</th></tr></thead><tbody>${d.socios.map(s=>`<tr><td>${escapeHtml(s.nome)||'—'}</td><td>${escapeHtml(s.qual)||'—'}</td></tr>`).join('')}</tbody></table></div>`;
  }
}

function dd2RenderFiscal(d){
  const el=document.getElementById('dd2-fiscal-content');
  if(!d){el.innerHTML='<p style="color:#ef4444">Dados fiscais não disponíveis (APIs indisponíveis no momento).</p>';return;}
  const sit=d.situacao||'—';
  const sitOk=(sit.toUpperCase().includes('ATIVA')||sit.toUpperCase().includes('REGULAR'));
  el.innerHTML=`<div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th>Verificação</th><th>Resultado</th><th>Status</th></tr></thead><tbody>
    <tr><td>Situação na Receita Federal</td><td>${escapeHtml(sit)}</td><td><span class="dd2-badge ${sitOk?'ok':'danger'}">${sitOk?'Regular':'Irregular'}</span></td></tr>
    <tr><td>Data de Abertura</td><td>${escapeHtml(d.abertura)||'—'}</td><td><span class="dd2-badge info">Info</span></td></tr>
  </tbody></table></div>`;
}

function dd2FmtDoc(docNum,tipo){
  if(tipo==='cnpj')return docNum.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,'$1.$2.$3/$4-$5');
  return docNum.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,'$1.$2.$3-$4');
}

const DD2_DJEN_URL='https://comunicaapi.pje.jus.br/api/v1/comunicacao';

// Chama o DJEN direto do navegador — API pública, sem chave, com CORS
// liberado (ver nota no topo do arquivo). Rate limit: 20 requisições por
// janela por IP; em caso de estouro a API responde 429.
async function dd2FetchDJEN(params){
  const qs=new URLSearchParams({itensPorPagina:'100',...params}).toString();
  const r=await fetch(`${DD2_DJEN_URL}?${qs}`,{headers:{'Accept':'application/json'},signal:AbortSignal.timeout(15000)});
  if(r.status===429) throw new Error('RATE_LIMIT');
  if(!r.ok) throw new Error('HTTP '+r.status);
  const d=await r.json();
  return Array.isArray(d?.items)?d.items:[];
}

// Busca comunicações processuais (citação/intimação/edital) no DJEN: por
// texto livre com o documento formatado (o teor costuma trazer o CPF/CNPJ
// da parte por extenso) e, quando disponível, por nome da parte — inclusive
// de cada sócio, no caso de CNPJ, pra cobrir os processos das pessoas
// ligadas à empresa. Resultados de todas as buscas são mesclados e
// deduplicados por id.
async function dd2BuscarProcessosDJEN(nome,docNum,tipo,socios){
  const docFmt=dd2FmtDoc(docNum,tipo);
  const buscas=[{origem:'documento',p:dd2FetchDJEN({texto:docFmt})}];
  if(nome) buscas.push({origem:'nome',p:dd2FetchDJEN({nomeParte:nome})});
  (socios||[]).filter(s=>s.nome).slice(0,4).forEach(s=>{
    buscas.push({origem:'sócio "'+s.nome+'"',p:dd2FetchDJEN({nomeParte:s.nome})});
  });
  const resultados=await Promise.allSettled(buscas.map(b=>b.p));
  let rateLimited=false,algumaFalhou=false;
  const porId=new Map();
  resultados.forEach((res,i)=>{
    if(res.status==='fulfilled'){
      res.value.forEach(item=>{
        if(!porId.has(item.id)) porId.set(item.id,{...item,_origem:[buscas[i].origem]});
        else porId.get(item.id)._origem.push(buscas[i].origem);
      });
    } else {
      algumaFalhou=true;
      if(String(res.reason?.message).includes('RATE_LIMIT')) rateLimited=true;
    }
  });
  const items=[...porId.values()].sort((a,b)=>(b.data_disponibilizacao||'').localeCompare(a.data_disponibilizacao||''));
  return {items,rateLimited,algumaFalhou};
}

// Links de verificação manual, como reforço à busca automática do DJEN
// (que não garante cobertura de 100% dos tribunais/processos). Quando é
// uma consulta de CNPJ, inclui também um link por sócio listado no QSA.
function dd2LinksManuaisHTML(nome,docNum,tipo,socios){
  const docFmt=dd2FmtDoc(docNum,tipo);
  const alvo=nome||docFmt;
  const alvoSafe=escapeHtml(alvo);
  const linksAlvo=[
    {label:`JusBrasil — processos de "${alvoSafe}"`,url:`https://www.jusbrasil.com.br/consulta-processual/?q=${encodeURIComponent(alvo)}`},
    {label:`JusBrasil — processos pelo documento ${docFmt}`,url:`https://www.jusbrasil.com.br/consulta-processual/?q=${docNum}`},
    {label:'CNJ — Consulta Processual Nacional (PJe)',url:'https://www.cnj.jus.br/pjecnj/'},
    {label:`Escavador — busca por "${alvoSafe}"`,url:`https://www.escavador.com/busca?q=${encodeURIComponent(alvo)}`},
  ];
  const linksSocios=(socios||[]).filter(s=>s.nome).slice(0,6).map(s=>({
    label:`JusBrasil — sócio "${escapeHtml(s.nome)}"`,
    url:`https://www.jusbrasil.com.br/consulta-processual/?q=${encodeURIComponent(s.nome)}`
  }));
  return `
    <div style="font-size:.72rem;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">Reforçar verificação manualmente</div>
    <div class="dd2-links-ext">${linksAlvo.map(l=>`<a href="${l.url}" target="_blank" class="dd2-link-ext">🔗 ${l.label}</a>`).join('')}</div>
    ${linksSocios.length?`<div style="font-size:.72rem;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin:10px 0 4px">Sócios / pessoas vinculadas ao CNPJ</div><div class="dd2-links-ext">${linksSocios.map(l=>`<a href="${l.url}" target="_blank" class="dd2-link-ext">🔗 ${l.label}</a>`).join('')}</div>`:''}
  `;
}

// Tenta identificar o nome da pessoa a partir do CPF cruzando trechos onde
// o documento aparece por extenso (DJEN, Querido Diário). É inferência
// textual, não confirmação oficial de identidade — nunca tratada como dado
// cadastral, só como indício pra melhorar as outras buscas.
function dd2ExtrairNomeProximoAoDoc(texto,docFmt){
  if(!texto||!docFmt) return null;
  const docEsc=docFmt.replace(/[.\-\/]/g,'[.\\-\\/]?');
  const padroes=[
    new RegExp('([A-ZÀ-Ü][A-ZÀ-Ü\\.\\s]{5,70}?)[,\\s]{1,3}CPF[:\\.\\s]{0,4}(?:n[ºo°]?\\.?)?\\s*'+docEsc,'i'),
    new RegExp('CPF[:\\.\\s]{0,4}(?:n[ºo°]?\\.?)?\\s*'+docEsc+'[,\\s\\-]{1,4}([A-ZÀ-Ü][A-ZÀ-Ü\\.\\s]{5,70})','i'),
  ];
  for(const re of padroes){
    const m=texto.match(re);
    if(m&&m[1]){
      const nome=m[1].trim().replace(/\s+/g,' ');
      if(nome.length>=6&&nome.length<=70&&/[A-ZÀ-Ü]{2}/.test(nome)) return nome;
    }
  }
  return null;
}

// Agrega candidatos de nome vindos do DJEN (campo destinatarios, quando a
// comunicação tem uma única parte — forte indício de que é ela) e de
// trechos de diários municipais, e fica com o mais recorrente. Sem
// candidato repetido, o achado é mostrado do mesmo jeito, mas com um único
// voto — a UI sempre deixa claro que é indício, não confirmação.
function dd2CandidatoNomePorCPF(fontes,docFmt){
  const contagem=new Map();
  const somar=nome=>{
    if(!nome) return;
    nome=nome.trim().replace(/\s+/g,' ');
    if(nome.length<6||nome.length>70) return;
    contagem.set(nome,(contagem.get(nome)||0)+1);
  };
  (fontes.djen||[]).forEach(p=>{
    const dests=p.destinatarios||[];
    if(dests.length===1&&dests[0]?.nome) somar(dests[0].nome);
    somar(dd2ExtrairNomeProximoAoDoc(p.texto||'',docFmt));
  });
  (fontes.diarios||[]).forEach(g=>{
    (g.excerpts||[]).forEach(tx=>somar(dd2ExtrairNomeProximoAoDoc(tx,docFmt)));
  });
  if(!contagem.size) return null;
  const [nome,vezes]=[...contagem.entries()].sort((a,b)=>b[1]-a[1])[0];
  const total=[...contagem.values()].reduce((a,b)=>a+b,0);
  return {nome,vezes,total};
}

function dd2RenderNomeIdentificado(candidato){
  const el=document.getElementById('dd2-cadastral-content');
  if(!el) return;
  if(!candidato){
    el.innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta cadastral disponível apenas para CNPJ. Nenhum nome foi identificado automaticamente a partir do CPF nas fontes consultadas (DJEN, Querido Diário) — informe o nome manualmente no campo acima para melhorar as demais buscas.</p>';
    return;
  }
  el.innerHTML=`<p style="color:#b45309;font-size:.85rem;margin-bottom:4px"><strong>&#128100; Nome identificado automaticamente:</strong> ${escapeHtml(candidato.nome)}</p>
  <p style="font-size:.78rem;color:#64748b">Encontrado em ${candidato.vezes} de ${candidato.total} menção(ões) ao CPF nas fontes consultadas — é um indício textual, <b>não é confirmação oficial de identidade</b>. Confira manualmente antes de usar.</p>`;
}

const DD2_QUERIDODIARIO_URL='https://api.queridodiario.ok.org.br/gazettes';

// Busca texto integral em diários oficiais de mais de 350 municípios
// (Querido Diário, Open Knowledge Brasil). API pública, sem chave, CORS
// liberado — diferente do DJEN (judicial), essa cobre atos municipais:
// licitação, nomeação, sanção administrativa local etc.
// O querystring SEM aspas é tratado como termos soltos (full-text OR) —
// testado na unha com um CPF formatado real: sem aspas, "total_gazettes"
// vinha 10000 (o teto da API), batendo em qualquer trecho de OCR com
// números parecidos; com aspas (frase exata) foi pra 0, que é o esperado
// pra um CPF completo (raramente publicado por extenso). Envolver em aspas
// faz a mesma diferença de precisão que o DOU (dd2FetchDOU) já usa.
async function dd2FetchQueridoDiario(querystring){
  if(!querystring) return [];
  const qs=new URLSearchParams({querystring:'"'+querystring+'"',size:'15'}).toString();
  const r=await fetch(`${DD2_QUERIDODIARIO_URL}?${qs}`,{headers:{'Accept':'application/json'},signal:AbortSignal.timeout(15000)});
  if(!r.ok) throw new Error('HTTP '+r.status);
  const d=await r.json();
  return Array.isArray(d?.gazettes)?d.gazettes:[];
}

const DD2_DOU_URL='https://www.in.gov.br/consulta/-/buscar/dou';

// Busca no Diário Oficial da União (atos federais). Não tem API JSON
// documentada, mas a página de busca embute um bloco
// <script type="application/json" id="..._params"> com os resultados
// estruturados (título, órgão, data, trecho) — foi assim que confirmamos
// que a busca funciona de verdade (testamos com CNPJ real e achou
// publicações federais correspondentes). CORS liberado, sem chave. Como
// depende da estrutura interna da página do in.gov.br (não é um contrato
// de API formal), pode quebrar se eles reformularem o site.
async function dd2FetchDOU(querystring){
  if(!querystring) return [];
  const url=`${DD2_DOU_URL}?q=${encodeURIComponent('"'+querystring+'"')}`;
  const r=await fetch(url,{headers:{'Accept':'text/html'},signal:AbortSignal.timeout(20000)});
  if(!r.ok) throw new Error('HTTP '+r.status);
  const html=await r.text();
  const m=html.match(/id="[^"]*BuscaDouPortlet_params"[^>]*>([\s\S]*?)<\/script>/);
  if(!m) return [];
  let data;
  try{ data=JSON.parse(m[1].trim()); }catch(e){ return []; }
  return Array.isArray(data?.jsonArray)?data.jsonArray:[];
}

// O PDF escaneado de origem (principalmente diários municipais antigos)
// às vezes tem OCR corrompido, que vaza como caractere de controle ou de
// substituição (U+FFFD) no trecho — mostrar isso é só ruído ilegível pro
// analista. Remove esses caracteres e descarta o trecho inteiro se, depois
// de limpo, sobrar muito pouca letra de verdade (sinal de que é lixo binário).
function dd2LimparTrecho(txt){
  if(!txt) return '';
  const limpo=txt.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F ]/g,"").trim();
  const letras=(limpo.match(/[a-zA-ZÀ-ÿ]/g)||[]).length;
  if(limpo.length>20 && letras/limpo.length<0.4) return '';
  return limpo;
}

// DOU e Querido Diário devolvem formatos totalmente diferentes (datas em
// formatos opostos, HTML de destaque embutido no texto etc.) — normaliza
// os dois pro mesmo formato de exibição.
function dd2NormalizarDiario(item,fonte){
  if(fonte==='DOU'){
    const trecho=dd2LimparTrecho((item.content||'').replace(/<[^>]+>/g,''));
    return {
      titulo:item.title||'—',
      local:(item.hierarchyStr||'').replace(/\//g,' › ')||'Diário Oficial da União',
      data:item.pubDate||'—',
      trechos:[trecho].filter(Boolean),
      url:item.urlTitle?`https://www.in.gov.br/web/dou/-/${item.urlTitle}`:'',
    };
  }
  return {
    titulo:`${item.territory_name||'—'} — ${item.state_code||'—'}`,
    local:'Diário Oficial Municipal',
    data:item.date||'—',
    trechos:(item.excerpts||[]).map(dd2LimparTrecho).filter(Boolean),
    url:item.url||'',
  };
}

// DOU usa DD/MM/AAAA, Querido Diário usa AAAA-MM-DD — converte os dois pro
// mesmo formato só pra poder ordenar cronologicamente.
function dd2DataDiarioOrdenavel(data){
  if(!data) return '';
  if(/^\d{4}-\d{2}-\d{2}/.test(data)) return data;
  const m=data.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return m?`${m[3]}-${m[2]}-${m[1]}`:data;
}

async function dd2BuscarDiarios(nome,docNum,tipo){
  const docFmt=dd2FmtDoc(docNum,tipo);
  // CPF completo quase nunca é publicado por extenso em diário oficial (LGPD
  // costuma mascarar: "***.456.789-**") — buscar por ele pra pessoa física
  // não tem valor (com a busca em frase exata, dá 0 resultado sempre) e sem
  // frase exata dava falso positivo por fragmento de número. Pra CPF, a
  // busca é só pelo nome. CNPJ continua buscando pelo documento também,
  // já que licitação/contrato publica o CNPJ completo com frequência.
  const buscasQD=tipo==='cnpj'?[dd2FetchQueridoDiario(docFmt)]:[];
  const buscasDOU=tipo==='cnpj'?[dd2FetchDOU(docFmt)]:[];
  if(nome){ buscasQD.push(dd2FetchQueridoDiario(nome)); buscasDOU.push(dd2FetchDOU(nome)); }

  const [resQD,resDOU]=await Promise.all([Promise.allSettled(buscasQD),Promise.allSettled(buscasDOU)]);
  let algumaFalhou=false;
  const porChave=new Map();
  resQD.forEach(res=>{
    if(res.status==='fulfilled'){
      res.value.forEach(g=>{
        const chave='qd|'+(g.territory_id||'')+'|'+(g.date||'')+'|'+(g.url||'');
        if(!porChave.has(chave)) porChave.set(chave,{...dd2NormalizarDiario(g,'Querido Diário'),_fonte:'Querido Diário'});
      });
    } else algumaFalhou=true;
  });
  resDOU.forEach(res=>{
    if(res.status==='fulfilled'){
      res.value.forEach(g=>{
        const chave='dou|'+(g.classPK||g.urlTitle||'');
        if(!porChave.has(chave)) porChave.set(chave,{...dd2NormalizarDiario(g,'DOU'),_fonte:'DOU'});
      });
    } else algumaFalhou=true;
  });

  const resultadosTodos=[...resQD,...resDOU];
  if(algumaFalhou&&resultadosTodos.every(r=>r.status==='rejected')) throw new Error('Todas as buscas em diários oficiais falharam');
  const items=[...porChave.values()].sort((a,b)=>dd2DataDiarioOrdenavel(b.data).localeCompare(dd2DataDiarioOrdenavel(a.data)));
  return {items,algumaFalhou};
}

function dd2RenderDiarios(res){
  const el=document.getElementById('dd2-diarios-content');
  if(!res){el.innerHTML='<p style="color:#ef4444">⚠️ Não foi possível consultar os diários oficiais automaticamente no momento.</p>';return;}
  const {items,algumaFalhou}=res;
  const aviso=algumaFalhou?'<p style="color:#b45309;font-size:.82rem;margin-bottom:6px">⚠️ Uma ou mais buscas em diários oficiais falharam — resultado pode estar incompleto.</p>':'';
  if(!items.length){el.innerHTML=aviso+'<p style="color:#22c55e;font-weight:600">✅ Nenhuma menção encontrada em diários oficiais.</p>';return;}
  el.innerHTML=aviso+`<p style="font-size:.78rem;color:#64748b;margin-bottom:10px">Busca automática no <strong>DOU — Diário Oficial da União</strong> (atos federais) e no <strong>Querido Diário</strong> (Open Knowledge Brasil — mais de 350 municípios). Clique num resultado pra ver todos os trechos onde o termo foi encontrado.</p>
  ${items.slice(0,30).map((g,i)=>{
    const trechos=(g.trechos||[]).filter(Boolean);
    const trecho=trechos[0]||'';
    const idRow='dd2-diario-det-'+i;
    const resumoCompleto=trechos.length?trechos.map((tx,j)=>`<div style="${j<trechos.length-1?'margin-bottom:10px;padding-bottom:10px;border-bottom:1px dashed #e2e8f0':''}">${trechos.length>1?`<b>Trecho ${j+1} de ${trechos.length}:</b><br>`:''}${escapeHtml(tx)}</div>`).join(''):'<span style="color:#94a3b8">Nenhum trecho disponível pra exibição.</span>';
    return `<div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:8px;background:#fff">
      <div style="cursor:pointer" onclick="dd2ToggleDetalhe('${idRow}','block')">
        <div style="font-weight:600;font-size:.85rem;margin-bottom:2px"><span id="${idRow}-seta" style="color:#94a3b8;font-size:.72rem">▸</span> <span class="dd2-badge ${g._fonte==='DOU'?'info':'warn'}">${g._fonte}</span> ${escapeHtml(g.titulo)||'—'}</div>
        <div style="font-size:.73rem;color:#94a3b8;margin:2px 0">${escapeHtml(g.local)||'—'} · ${escapeHtml(g.data)||'—'}${trechos.length>1?` · ${trechos.length} trechos`:''}</div>
        <div style="font-size:.8rem;color:#64748b;margin:4px 0">${escapeHtml(trecho.substring(0,200))}${trecho.length>200?'…':''}</div>
      </div>
      <div id="${idRow}" style="display:none;background:#f8fafc;border-radius:6px;padding:10px;margin:8px 0 4px;font-size:.8rem;color:#334155;line-height:1.6">${resumoCompleto}</div>
      ${g.url?`<a href="${g.url}" target="_blank" onclick="event.stopPropagation()" style="font-size:.76rem;color:#0f2d4a">🔗 Ver publicação original</a>`:''}
    </div>`;
  }).join('')}`;
}

const DD2_SANCTIONS_URL='https://api.sanctions.network/rpc/search_sanctions';

// Agrega OFAC (Tesouro dos EUA) + ONU + UE numa busca só, por nome. API de
// terceiro (open source, não-oficial) — usada como sinal complementar de
// PLD/FT, sempre com ressalva na tela pra conferir na fonte oficial.
async function dd2FetchSanctionsNetwork(nome){
  if(!nome) return [];
  const r=await fetch(`${DD2_SANCTIONS_URL}?name=${encodeURIComponent(nome)}`,{headers:{'Accept':'application/json'},signal:AbortSignal.timeout(12000)});
  if(!r.ok) throw new Error('HTTP '+r.status);
  const d=await r.json();
  return Array.isArray(d)?d:[];
}

// A API sanctions.network faz correspondência por token solto, sem peso de
// relevância — pesquisar só "SUPERMERCADOS" ou só "CASH" já traz de volta
// entidades OFAC sem qualquer relação real com o nome pesquisado, batendo
// apenas numa palavra genérica do ramo de atuação (confirmado testando a
// API diretamente). Por isso filtramos aqui no cliente: só mantemos um
// resultado se pelo menos um token DISTINTIVO (fora da lista de termos
// corporativos/setoriais genéricos) do nome pesquisado aparecer em algum
// dos nomes/aliases devolvidos pela API.
const DD2_SANCOES_STOPWORDS=new Set(['S/A','SA','LTDA','LDA','EIRELI','ME','EPP','CIA','COMERCIO','COMÉRCIO','INDUSTRIA','INDÚSTRIA','INDUSTRY','SUPERMERCADO','SUPERMERCADOS','SUPERMARKET','SUPERMARKETS','MERCADO','MERCADOS','MARKET','MARKETS','CASH','CARRY','RETAIL','STORE','STORES','GROUP','GRUPO','HOLDING','HOLDINGS','SERVICOS','SERVIÇOS','SERVICE','SERVICES','COMPANY','CO','CORP','CORPORATION','INC','LLC','LTD','TRADING','IMPORT','EXPORT','IMPORTACAO','EXPORTACAO','IMPORTAÇÃO','EXPORTAÇÃO','DISTRIBUIDORA','DISTRIBUTION','AGRICULTURE','AGRICULTURA','CONSTRUCTION','CONSTRUCAO','CONSTRUÇÃO','ENTERPRISE','ENTERPRISES','THE','AND','E','DE','DA','DO','DOS','DAS']);

function dd2TokensRelevantes(nome){
  return (nome||'').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Z0-9\s]/g,' ').split(/\s+/).filter(t=>t.length>=3&&!DD2_SANCOES_STOPWORDS.has(t));
}

// Uma lista de stopwords nunca dá conta de todo termo corporativo genérico
// em todo idioma (testando a API na unha: "DISTRIBUIDORA" sozinho traz de
// volta 12 empresas latino-americanas sem nenhuma relação entre si;
// "INCORPORATED" sozinho traz dezenas de shell companies; "CASH" traz uma
// entidade ligada ao Hamas). Em vez de tentar enumerar toda palavra
// genérica possível, exigimos 2+ tokens distintivos em comum sempre que o
// nome pesquisado tiver 2+ tokens disponíveis — uma única palavra batendo
// por coincidência é comum, duas baterem ao mesmo tempo por acaso é raro o
// suficiente pra ser um indício real. Só aceitamos 1 token em comum quando
// o nome pesquisado não tem mais que isso pra oferecer.
function dd2FiltrarRuidoSancoesIntl(hits,nomeConsultado){
  const tokensAlvo=dd2TokensRelevantes(nomeConsultado);
  if(!tokensAlvo.length)return hits;
  const minComuns=tokensAlvo.length>=2?2:1;
  return hits.filter(h=>{
    const tokensHit=new Set((h.names||[]).flatMap(n=>dd2TokensRelevantes(n)));
    const comuns=tokensAlvo.filter(t=>tokensHit.has(t));
    return comuns.length>=minComuns;
  });
}

const DD2_POLO_LABEL={A:'Ativo',P:'Passivo',T:'Terceiro',D:'Outro'};

// Usada tanto na tabela de Processos Judiciais quanto na de Sanções — cada
// linha clicável revela uma linha de detalhe logo abaixo (teor da
// comunicação, ou motivo/fundamentação da sanção).
function dd2ToggleDetalhe(id,displayAberto){
  const el=document.getElementById(id);
  if(!el) return;
  const abrir=el.style.display==='none';
  el.style.display=abrir?(displayAberto||'table-row'):'none';
  const seta=document.getElementById(id+'-seta');
  if(seta) seta.textContent=abrir?'▾':'▸';
}

function dd2RenderJudicial(res,nome,docNum,tipo,socios){
  const el=document.getElementById('dd2-judicial-content');
  const {items,rateLimited,algumaFalhou}=res;
  let avisos='';
  if(rateLimited) avisos+='<p style="color:#b45309;font-size:.82rem;margin-bottom:6px">⚠️ Limite de requisições do DJEN atingido — resultado pode estar incompleto. Tente novamente em cerca de 1 minuto.</p>';
  else if(algumaFalhou) avisos+='<p style="color:#b45309;font-size:.82rem;margin-bottom:6px">⚠️ Uma ou mais buscas no DJEN falharam — resultado pode estar incompleto.</p>';
  const tabela=items.length?`<div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th></th><th>Data</th><th>Tribunal</th><th>Tipo</th><th>Classe / Processo</th><th>Encontrado por</th><th>Fonte</th></tr></thead>
  <tbody>${items.slice(0,60).map((p,i)=>{
    const dest=(p.destinatarios||[]).map(d=>`${escapeHtml(d.nome)} (${DD2_POLO_LABEL[d.polo]||'—'})`).join(', ')||'—';
    const link=p.link||'';
    const fonte=link?`<a href="${escapeHtml(link)}" target="_blank" onclick="event.stopPropagation()" class="dd2-link-ext" style="padding:4px 9px;font-size:.73rem">🔗 Abrir</a>`:'<span style="color:#94a3b8;font-size:.73rem">—</span>';
    const idRow='dd2-jud-det-'+i;
    const resumo=(p.texto||'').trim();
    return `<tr style="cursor:pointer" onclick="dd2ToggleDetalhe('${idRow}')"><td style="width:18px;color:#94a3b8;font-size:.75rem" id="${idRow}-seta">▸</td><td style="font-size:.75rem">${escapeHtml(p.data_disponibilizacao)||'—'}</td><td><span class="dd2-badge info">${escapeHtml(p.siglaTribunal)}</span></td><td>${escapeHtml(p.tipoComunicacao)||'—'}</td><td>${escapeHtml(p.nomeClasse)||'—'}<br><span style="font-size:.73rem;color:#64748b">${escapeHtml(p.numeroprocessocommascara||p.numero_processo)||'—'} — ${dest}</span></td><td style="font-size:.75rem">${p._origem.map(o=>escapeHtml(o)).join(', ')}</td><td>${fonte}</td></tr>
    <tr id="${idRow}" style="display:none;background:#f8fafc"><td></td><td colspan="6" style="padding:10px 12px;font-size:.8rem;color:#334155;line-height:1.6;white-space:pre-wrap">${resumo?`<b>Resumo do teor da comunicação:</b><br>${escapeHtml(resumo.substring(0,800))}${resumo.length>800?'…':''}`:'<span style="color:#94a3b8">Teor da comunicação não disponível para exibição.</span>'}</td></tr>`;
  }).join('')}</tbody></table></div>`:`<p style="color:#22c55e;font-weight:600">✅ Nenhuma comunicação processual encontrada no DJEN.</p>`;
  el.innerHTML=`
    ${avisos}
    <p style="font-size:.78rem;color:#64748b;margin-bottom:10px">Busca automática no <strong>DJEN — Diário de Justiça Eletrônico Nacional</strong> (CNJ): citações, intimações e editais de tribunais de todo o país. A cobertura não é de 100% dos tribunais/processos — use os links abaixo para reforçar a verificação.</p>
    ${tabela}
    <div style="margin-top:14px">${dd2LinksManuaisHTML(nome,docNum,tipo,socios)}</div>
  `;
}

// Motivo/fundamentação de cada sanção, pra linha de detalhe expansível —
// campos que a API já devolve mas a tabela resumida não mostra.
function dd2MotivoSancaoHTML(item,base){
  if(base==='CEIS'||base==='CNEP'){
    const fund=(item.fundamentacao||[]).map(f=>f.descricao||f.nome).filter(Boolean).join('; ');
    return `
      ${item.fonteSancao?.nomeExibicao?`<div><b>Fonte:</b> ${escapeHtml(item.fonteSancao.nomeExibicao)}</div>`:''}
      ${fund?`<div><b>Fundamentação legal:</b> ${escapeHtml(fund)}</div>`:''}
      ${item.dataTransitoJulgado?`<div><b>Trânsito em julgado:</b> ${escapeHtml(item.dataTransitoJulgado)}</div>`:''}
      ${item.dataPublicacaoSancao?`<div><b>Publicação:</b> ${escapeHtml(item.dataPublicacaoSancao)}</div>`:''}
      ${!fund&&!item.dataTransitoJulgado&&!item.dataPublicacaoSancao?'<span style="color:#94a3b8">Sem detalhes adicionais disponíveis nesta base.</span>':''}
    `;
  }
  if(base==='Leniência'){
    const empresas=(item.sancoes||[]).map(s=>`${s.razaoSocial||s.nomeInformadoOrgaoResponsavel||'—'}${s.cnpjFormatado?' ('+s.cnpjFormatado+')':''}`).join('<br>');
    return `<div><b>Situação do acordo:</b> ${escapeHtml(item.situacaoAcordo)||'—'}</div>${empresas?`<div style="margin-top:4px"><b>Empresas envolvidas:</b><br>${empresas}</div>`:''}`;
  }
  if(base==='CEPIM'){
    return `<div><b>Motivo:</b> ${escapeHtml(item.motivo)||'—'}</div>${item.convenio?.numero?`<div><b>Convênio:</b> ${escapeHtml(item.convenio.numero)}</div>`:''}`;
  }
  if(base==='CEAF'){
    const p=item.punicao||{};
    return `
      <div><b>Punido:</b> ${escapeHtml(p.nomePunido)||'—'}</div>
      ${p.portaria?`<div><b>Portaria:</b> ${escapeHtml(p.portaria)}</div>`:''}
      ${p.processo?`<div><b>Processo:</b> ${escapeHtml(p.processo)}</div>`:''}
      ${p.paginaDOU?`<div><b>Diário Oficial:</b> página ${escapeHtml(p.paginaDOU)}${p.secaoDOU?', seção '+escapeHtml(p.secaoDOU):''}</div>`:''}
    `;
  }
  // Internacional (sanctions.network — OFAC/ONU/UE)
  return `
    ${item.remarks?`<div><b>Motivo / observação:</b> ${escapeHtml(item.remarks)}</div>`:'<div style="color:#94a3b8">Nenhum motivo detalhado disponível nesta base.</div>'}
    ${(item.positions||[]).length?`<div style="margin-top:4px"><b>Cargo / posição:</b> ${escapeHtml(item.positions.join(', '))}</div>`:''}
    ${(item.names||[]).length>1?`<div style="margin-top:4px"><b>Também conhecido como:</b> ${escapeHtml(item.names.slice(1).join(', '))}</div>`:''}
    <div style="margin-top:8px"><a href="https://sanctionssearch.ofac.treas.gov/" target="_blank" onclick="event.stopPropagation()" class="dd2-link-ext" style="padding:4px 9px;font-size:.72rem">🔗 Conferir na busca oficial do OFAC</a></div>
  `;
}

// CEIS/CNEP, Leniência, CEPIM, CEAF e o agregador internacional têm formatos
// de resposta bem diferentes entre si — essa função normaliza cada um pras
// mesmas colunas da tabela.
function dd2NormalizarSancao(item,base){
  if(base==='CEIS'||base==='CNEP'){
    return{descricao:item.tipoSancao?.descricaoPortal||item.tipoSancao?.descricaoResumida||'—',orgao:item.orgaoSancionador?.nome||'—',inicio:item.dataInicioSancao,fim:item.dataFimSancao};
  }
  if(base==='Leniência'){
    const empresas=(item.sancoes||[]).map(s=>s.razaoSocial||s.nomeInformadoOrgaoResponsavel).filter(Boolean).join(', ');
    return{descricao:'Acordo de Leniência'+(item.situacaoAcordo?' — '+item.situacaoAcordo:'')+(empresas?' ('+empresas+')':''),orgao:item.orgaoResponsavel||'—',inicio:item.dataInicioAcordo,fim:item.dataFimAcordo};
  }
  if(base==='CEPIM'){
    return{descricao:'Entidade impedida de celebrar convênio'+(item.motivo?' — '+item.motivo:''),orgao:item.orgaoSuperior?.nome||'—',inicio:item.dataReferencia,fim:null};
  }
  if(base==='CEAF'){
    return{descricao:(item.tipoPunicao?.descricao||'Punição disciplinar')+(item.cargoEfetivo?' — '+item.cargoEfetivo:''),orgao:item.orgaoLotacao?.nome||'—',inicio:item.dataPublicacao,fim:null};
  }
  // Internacional (sanctions.network — OFAC/ONU/UE)
  return{descricao:'Sanção internacional'+(item.source?' — '+String(item.source).toUpperCase():'')+((item.positions||[]).length?' — '+item.positions.join(', '):''),orgao:(item.names||[]).join(', ')||'—',inicio:item.listed_on,fim:null};
}

function dd2SanTotal(d){
  return (d?.ceis||[]).length+(d?.cnep||[]).length+(d?.leniencia||[]).length+(d?.cepim||[]).length+(d?.ceaf||[]).length+(d?.internacional||[]).length;
}

function dd2RenderSancoes(d){
  const el=document.getElementById('dd2-sancoes-content');
  const falhouTudo=!!(d?.ceisFalhou&&d?.cnepFalhou);
  if(falhouTudo){el.innerHTML='<p style="color:#ef4444;font-weight:600">⚠️ Não foi possível consultar as bases CEIS e CNEP automaticamente no momento.</p>';return;}
  let avisos='';
  if(d?.ceisFalhou) avisos+='<p style="color:#b45309;font-size:.82rem;margin-bottom:6px">⚠️ Não foi possível consultar a base CEIS — resultado pode estar incompleto.</p>';
  else if(d?.cnepFalhou) avisos+='<p style="color:#b45309;font-size:.82rem;margin-bottom:6px">⚠️ Não foi possível consultar a base CNEP — resultado pode estar incompleto.</p>';
  const all=[
    ...(d?.ceis||[]).map(s=>({...dd2NormalizarSancao(s,'CEIS'),_base:'CEIS',_raw:s})),
    ...(d?.cnep||[]).map(s=>({...dd2NormalizarSancao(s,'CNEP'),_base:'CNEP',_raw:s})),
    ...(d?.leniencia||[]).map(s=>({...dd2NormalizarSancao(s,'Leniência'),_base:'Leniência',_raw:s})),
    ...(d?.cepim||[]).map(s=>({...dd2NormalizarSancao(s,'CEPIM'),_base:'CEPIM',_raw:s})),
    ...(d?.ceaf||[]).map(s=>({...dd2NormalizarSancao(s,'CEAF'),_base:'CEAF',_raw:s})),
    ...(d?.internacional||[]).map(s=>({...dd2NormalizarSancao(s,'Internacional'),_base:'Internacional',_raw:s})),
  ];
  if(!all.length){el.innerHTML=avisos+'<p style="color:#22c55e;font-weight:600">✅ Nenhuma sanção ou restrição encontrada nas bases consultadas.</p>';return;}
  const temIntl=all.some(s=>s._base==='Internacional');
  el.innerHTML=avisos+`<p style="font-size:.72rem;color:#94a3b8;margin-bottom:8px">Clique numa linha para ver o motivo/fundamentação completa.</p><div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th></th><th>Base</th><th>Descrição</th><th>Órgão</th><th>Período</th><th>Status</th></tr></thead>
  <tbody>${all.map((s,i)=>{
    const semVigencia=s._base==='CEPIM'||s._base==='CEAF'||s._base==='Internacional';
    const statusTxt=s.fim?'Encerrada':(semVigencia?'Registrado':'Vigente');
    const idRow='dd2-san-det-'+i;
    return `<tr style="cursor:pointer" onclick="dd2ToggleDetalhe('${idRow}')"><td style="width:18px;color:#94a3b8;font-size:.75rem" id="${idRow}-seta">▸</td><td><span class="dd2-badge danger">${s._base}</span></td><td>${escapeHtml(s.descricao)}</td><td>${escapeHtml(s.orgao)}</td><td>${escapeHtml(s.inicio)||'—'}${s.fim!=null?' – '+escapeHtml(s.fim):''}</td><td><span class="dd2-badge ${!s.fim&&!semVigencia?'danger':'warn'}">${statusTxt}</span></td></tr>
    <tr id="${idRow}" style="display:none;background:#f8fafc"><td></td><td colspan="5" style="padding:10px 12px;font-size:.8rem;color:#334155;line-height:1.6">${dd2MotivoSancaoHTML(s._raw,s._base)}</td></tr>`;
  }).join('')}</tbody></table></div>
  ${temIntl?`<p style="font-size:.72rem;color:#94a3b8;margin-top:10px">⚠️ Resultados "Internacional" vêm de um agregador de terceiros (sanctions.network) não-oficial — use como indício, confirme na fonte primária (OFAC/ONU/UE) antes de qualquer decisão.</p>`:''}`;
}

function dd2RenderPep(data,falhou){
  const el=document.getElementById('dd2-pep-content');
  if(falhou){el.innerHTML='<p style="color:#ef4444;font-weight:600">⚠️ Não foi possível consultar a base de PEPs automaticamente no momento.</p>';return;}
  if(!Array.isArray(data)||!data.length){el.innerHTML='<p style="color:#22c55e;font-weight:600">✅ Nenhum registro PEP encontrado.</p>';return;}
  el.innerHTML=`<div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th>Nome</th><th>Cargo / Função</th><th>Órgão</th><th>Período</th><th>Status</th></tr></thead>
  <tbody>${data.slice(0,50).map(p=>`<tr><td>${escapeHtml(p.nome)||'—'}</td><td>${escapeHtml(p.descricao_funcao)||'—'}</td><td>${escapeHtml(p.nome_orgao)||'—'}</td><td>${escapeHtml(p.dt_inicio_exercicio)||'—'} – ${escapeHtml(p.dt_fim_exercicio)||'atual'}</td><td><span class="dd2-badge pep">&#9888; PEP</span></td></tr>`).join('')}</tbody></table></div>`;
}

const DD2_BOLSA_MANUAL_URL='https://portaldatransparencia.gov.br/beneficios/novo-bolsa-familia';
function dd2LinkManualBolsa(){
  return `<div class="dd2-links-ext"><a href="${DD2_BOLSA_MANUAL_URL}" target="_blank" class="dd2-link-ext">🔗 Consultar manualmente no Portal da Transparência</a></div>`;
}

function dd2RenderBolsaFamilia(res){
  const el=document.getElementById('dd2-bolsa-content');
  if(!res || !Array.isArray(res.items)){
    el.innerHTML=`<p style="color:#ef4444;margin-bottom:10px">⚠️ Não foi possível consultar o Bolsa Família automaticamente no momento.</p>${dd2LinkManualBolsa()}`;
    return;
  }
  const {items:data, baseAntigaFalhou, baseNovaFalhou, nisNaoEncontrado, nisFalhouAoConsultar}=res;
  let avisos='';
  if(baseAntigaFalhou) avisos+='<p style="color:#b45309;font-size:.82rem;margin-bottom:6px">⚠️ Uma ou mais consultas à base do Bolsa Família antigo falharam — resultado pode estar incompleto (possível limite de requisições).</p>';
  if(nisFalhouAoConsultar) avisos+='<p style="color:#ef4444;font-size:.82rem;margin-bottom:6px">⚠️ A consulta pra resolver o NIS desta pessoa falhou (não é "sem NIS cadastrado" — a chamada em si deu erro, possivelmente chave/token ou limite de requisições) — a base do Novo Bolsa Família não foi verificada. Tente novamente.</p>';
  else if(nisNaoEncontrado) avisos+='<p style="color:#b45309;font-size:.82rem;margin-bottom:6px">⚠️ Não foi encontrado NIS cadastrado pra este CPF — a base do Novo Bolsa Família (atual) não foi consultada. Confira manualmente.</p>';
  else if(baseNovaFalhou) avisos+='<p style="color:#b45309;font-size:.82rem;margin-bottom:6px">⚠️ Uma ou mais consultas à base do Novo Bolsa Família (atual) falharam — resultado pode estar incompleto (possível limite de requisições).</p>';
  if(!data.length){el.innerHTML=`${avisos}<p style="color:#22c55e;font-weight:600;margin-bottom:10px">✅ Nenhuma parcela de Bolsa Família encontrada para este CPF.</p>${dd2LinkManualBolsa()}`;return;}
  el.innerHTML=`${avisos}<div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th>Programa</th><th>Mês Referência</th><th>UF</th><th>Município</th><th>NIS</th><th>Beneficiário</th><th>Valor</th></tr></thead>
  <tbody>${data.slice(0,50).map(p=>{
    const titular=p.titularBolsaFamilia||p.beneficiarioNovoBolsaFamilia;
    const valor=p.valor!=null?p.valor:p.valorSaque;
    return `<tr>
    <td><span class="dd2-badge ${p._novo?'info':'warn'}">${p._novo?'Novo Bolsa Família':'Bolsa Família (antigo)'}</span></td>
    <td>${escapeHtml(p.dataMesReferencia||p.dataMesCompetencia)||'—'}</td>
    <td>${escapeHtml(p.municipio?.uf?.sigla)||'—'}</td>
    <td>${escapeHtml(p.municipio?.nomeIBGE)||'—'}</td>
    <td>${escapeHtml(titular?.nis)||'—'}</td>
    <td>${escapeHtml(titular?.nome)||'—'}</td>
    <td>${valor!=null?'R$ '+Number(valor).toLocaleString('pt-BR',{minimumFractionDigits:2}):'—'}</td>
  </tr>`;}).join('')}</tbody></table></div>
  ${dd2LinkManualBolsa()}`;
}

// Busca notícias negativas via Google News RSS — feed público, estável, que
// devolve título/link/data/veículo reais (diferente da antiga API de
// "respostas instantâneas" do DuckDuckGo, que não é motor de busca e quase
// sempre voltava vazia — ver nota equivalente em due-diligence.js).
// O feed não tem CORS liberado pro navegador, então passa por um proxy;
// dois proxies são tentados em sequência caso o primeiro esteja fora do ar
// ou tenha sido bloqueado pelo Google (páginas de "tráfego incomum").
const DD2_CORS_PROXIES=[
  u=>'https://corsproxy.io/?url='+encodeURIComponent(u),
  u=>'https://api.allorigins.win/raw?url='+encodeURIComponent(u),
];

function dd2ParseGoogleNewsRSS(xmlText){
  const doc=new DOMParser().parseFromString(xmlText,'text/xml');
  if(doc.querySelector('parsererror'))return null;
  return[...doc.querySelectorAll('item')].map(it=>{
    let title=it.querySelector('title')?.textContent||'';
    const source=it.querySelector('source')?.textContent||'';
    if(source&&title.endsWith(' - '+source))title=title.slice(0,-(' - '+source).length);
    return{title,link:it.querySelector('link')?.textContent||'',pubDate:it.querySelector('pubDate')?.textContent||'',source:{name:source}};
  });
}

async function dd2FetchGoogleNewsRSS(query){
  const feedUrl='https://news.google.com/rss/search?q='+encodeURIComponent(query)+'&hl=pt-BR&gl=BR&ceid=BR:pt-419';
  let lastErr=null;
  for(const buildProxyUrl of DD2_CORS_PROXIES){
    try{
      const r=await fetch(buildProxyUrl(feedUrl),{signal:AbortSignal.timeout(12000)});
      if(!r.ok){lastErr=new Error('HTTP '+r.status);continue;}
      const text=await r.text();
      if(!text.includes('<item>')){lastErr=new Error('Resposta sem itens — possível bloqueio do provedor');continue;}
      const items=dd2ParseGoogleNewsRSS(text);
      if(items)return items;
      lastErr=new Error('XML inválido');
    }catch(e){lastErr=e;}
  }
  throw lastErr||new Error('Todos os provedores de busca de notícias falharam');
}

// Dispara buscas em paralelo por cada categoria de risco (mesmas queries
// booleanas usadas no Due Diligence 1 — ver buildBooleanQuery em
// due-diligence.js) e mescla os resultados deduplicados por link, pra
// cobrir criminal/financeiro/regulatório/reputacional numa só varredura.
async function dd2BuscarMidiaNegativa(nome,docFmt){
  const bool=(typeof buildBooleanQuery==='function')?buildBooleanQuery(nome,docFmt):null;
  const queries=bool?[bool.criminal,bool.financeiro,bool.regulatorio,bool.reputacional]:[`"${nome}" ${docFmt||''} corrupção OR fraude OR escândalo OR investigação`.trim()];
  const resultados=await Promise.allSettled(queries.map(q=>dd2FetchGoogleNewsRSS(q)));
  const porLink=new Map();
  let algumaOk=false;
  resultados.forEach(res=>{
    if(res.status==='fulfilled'){
      algumaOk=true;
      res.value.forEach(item=>{if(item.link&&!porLink.has(item.link))porLink.set(item.link,item);});
    }
  });
  if(!algumaOk)throw new Error('Todas as buscas de mídia negativa falharam');
  return[...porLink.values()].sort((a,b)=>new Date(b.pubDate)-new Date(a.pubDate));
}

// Links de verificação manual, como reforço à busca automática (mesmo
// padrão do dd2LinksManuaisHTML usado na seção Judicial).
function dd2LinksManuaisMidiaHTML(nome,docFmt){
  const bool=(typeof buildBooleanQuery==='function')?buildBooleanQuery(nome,docFmt):null;
  const alvo=nome||docFmt||'';
  const alvoSafe=escapeHtml(alvo);
  const qCriminal=bool?bool.criminal:`"${alvo}" corrupção OR fraude OR escândalo`;
  const links=[
    {label:`Google — mídias negativas de "${alvoSafe}" (busca booleana)`,url:`https://www.google.com/search?q=${encodeURIComponent(qCriminal)}`},
    {label:`Google Notícias — "${alvoSafe}"`,url:`https://news.google.com/search?q=${encodeURIComponent('"'+alvo+'"')}&hl=pt-BR&gl=BR&ceid=BR:pt-419`},
    {label:`JusBrasil Notícias — "${alvoSafe}"`,url:`https://www.jusbrasil.com.br/busca?q=${encodeURIComponent(alvo)}`},
    {label:`Reclame Aqui — "${alvoSafe}"`,url:`https://www.reclameaqui.com.br/busca/?q=${encodeURIComponent(alvo)}`},
  ];
  return`
    <div style="font-size:.72rem;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">Reforçar verificação manualmente</div>
    <div class="dd2-links-ext">${links.map(l=>`<a href="${l.url}" target="_blank" class="dd2-link-ext">🔗 ${l.label}</a>`).join('')}</div>
  `;
}

function dd2RenderMidia(data,nome,docFmt,falhou){
  const el=document.getElementById('dd2-midia-content');
  if(falhou){
    el.innerHTML=`<p style="color:#ef4444;margin-bottom:10px">⚠️ Não foi possível consultar mídia negativa automaticamente no momento (provedores de busca indisponíveis ou bloqueados) — confira manualmente.</p>${dd2LinksManuaisMidiaHTML(nome,docFmt)}`;
    return;
  }
  if(!data.length){
    el.innerHTML=`<p style="color:#22c55e;font-weight:600;margin-bottom:10px">✅ Nenhuma notícia negativa encontrada nas buscas automáticas.</p>${dd2LinksManuaisMidiaHTML(nome,docFmt)}`;
    return;
  }
  el.innerHTML=data.slice(0,20).map(n=>`<div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:8px;background:#fff">
    <div style="font-weight:600;font-size:.88rem;margin-bottom:4px"><a href="${n.link||'#'}" target="_blank" style="color:#0f2d4a;text-decoration:none">${escapeHtml(n.title)||'Sem título'}</a></div>
    <div style="font-size:.78rem;color:#64748b">${n.pubDate?new Date(n.pubDate).toLocaleDateString('pt-BR'):''} — ${escapeHtml(n.source?.name)||''}</div>
  </div>`).join('')+`<div style="margin-top:10px">${dd2LinksManuaisMidiaHTML(nome,docFmt)}</div>`;
}

function dd2RenderScore(){
  const gauge=document.getElementById('dd2-gauge');
  const label=document.getElementById('dd2-gauge-label');
  const pillarsEl=document.getElementById('dd2-pillars');
  let score=0;
  const d=dd2CadastralData;
  const sit=d?.situacao||'';
  if(sit&&!sit.toUpperCase().includes('ATIVA')&&!sit.toUpperCase().includes('REGULAR'))score+=30;

  // Sanções/PEP/Mídia só somam pontos quando a consulta de fato rodou — uma
  // falha de rede/autenticação vira "não verificado" (ver pillars abaixo),
  // não "0 = limpo". Sem essa distinção, uma consulta que falhar em
  // silêncio (ex.: 401 do token) zera o score mesmo sem checar nada.
  const sancoesFalhouTudo=!!(dd2SancoesData?.ceisFalhou&&dd2SancoesData?.cnepFalhou);
  const sanTotal=dd2SanTotal(dd2SancoesData);
  if(sanTotal>0)score=Math.min(100,score+40);

  if(!dd2PepFalhou&&dd2PepData.length>0)score=Math.min(100,score+20);

  // Processos judiciais (DJEN) e mídia negativa antes não entravam no
  // score — por isso ele quase sempre vinha zerado: sanções/PEP raramente
  // têm registro, e eram os únicos fatores considerados. Agora um volume
  // relevante de comunicações processuais ou notícia negativa real também
  // eleva o risco.
  const judTotal=dd2JudicialData.length;
  if(judTotal>=6)score=Math.min(100,score+25);
  else if(judTotal>=3)score=Math.min(100,score+15);
  else if(judTotal>=1)score=Math.min(100,score+8);

  if(!dd2MidiaFalhou&&dd2MidiaData.length>0)score=Math.min(100,score+25);

  score=Math.min(100,score);
  gauge.textContent=score;
  if(score<25){gauge.className='dd2-gauge-circle low';label.textContent='RISCO BAIXO';label.style.color='#22c55e';}
  else if(score<60){gauge.className='dd2-gauge-circle medium';label.textContent='RISCO MÉDIO';label.style.color='#f59e0b';}
  else{gauge.className='dd2-gauge-circle high';label.textContent='RISCO ALTO';label.style.color='#ef4444';}
  const pillars=[
    {icon:'&#127963;',label:'Cadastral',cls:(!sit||sit.toUpperCase().includes('ATIVA')||sit.toUpperCase().includes('REGULAR'))?'ok':'bad',txt:null},
    {icon:'&#9878;',label:'Judicial',cls:judTotal===0?'ok':'bad',txt:null},
    {icon:'&#128171;',label:'Sanções',cls:sancoesFalhouTudo?'warn':(sanTotal===0?'ok':'bad'),txt:sancoesFalhouTudo?'Não verificado':null},
    {icon:'&#127963;',label:'PEP',cls:dd2PepFalhou?'warn':(dd2PepData.length===0?'ok':'bad'),txt:dd2PepFalhou?'Não verificado':null},
    {icon:'&#128240;',label:'Mídia',cls:dd2MidiaFalhou?'warn':(dd2MidiaData.length===0?'ok':'bad'),txt:dd2MidiaFalhou?'Não verificado':null}
  ];
  pillarsEl.innerHTML=pillars.map(p=>`<div class="dd2-pillar">
    <div class="dd2-pillar-icon">${p.icon}</div>
    <div class="dd2-pillar-label">${p.label}</div>
    <div class="dd2-pillar-status ${p.cls}">${p.txt||(p.cls==='ok'?'OK':'Atenção')}</div>
  </div>`).join('');
}

function dd2RenderTimeline(){
  const el=document.getElementById('dd2-timeline-content');
  const events=[];
  const d=dd2CadastralData;
  if(d?.abertura){
    events.push({date:d.abertura,text:'Empresa aberta',sub:'Receita Federal',cls:'ok'});
  }
  dd2JudicialData.slice(0,5).forEach(p=>{
    if(p.data_disponibilizacao)events.push({date:p.data_disponibilizacao,text:(p.tipoComunicacao||'Comunicação')+': '+(p.nomeClasse||p.numeroprocessocommascara||'Processo judicial'),sub:p.siglaTribunal||'DJEN',cls:'warn'});
  });
  (dd2SancoesData?.ceis||[]).slice(0,3).forEach(s=>{
    if(s.dataInicioSancao)events.push({date:s.dataInicioSancao,text:'Sanção CEIS',sub:s.orgaoSancionador?.nome||'CEIS',cls:'danger'});
  });
  events.sort((a,b)=>b.date.localeCompare(a.date));
  if(!events.length){el.innerHTML='<p style="color:#64748b;font-size:.85rem">Nenhum evento registrado.</p>';return;}
  el.innerHTML=events.map(e=>`<div class="dd2-tl-item ${e.cls}">
    <div class="dd2-tl-date">${e.date}</div>
    <div class="dd2-tl-text">${e.text}</div>
    <div class="dd2-tl-sub">${e.sub}</div>
  </div>`).join('');
}

function dd2RenderChecklist(){
  const el=document.getElementById('dd2-checklist-content');
  const d=dd2CadastralData;
  const sit=d?.situacao||'';
  const sanTotal=dd2SanTotal(dd2SancoesData);
  const sancoesFalhouTudo=!!(dd2SancoesData?.ceisFalhou&&dd2SancoesData?.cnepFalhou);
  const items=[
    {state:d?'ok':'bad',label:'Dados cadastrais obtidos',icon:'&#127963;'},
    {state:(!sit||sit.toUpperCase().includes('ATIVA')||sit.toUpperCase().includes('REGULAR'))?'ok':'bad',label:'Situação cadastral regular',icon:'&#128188;'},
    {state:dd2JudicialData.length===0?'ok':'bad',label:dd2JudicialData.length?`${dd2JudicialData.length} comunicação(ões) processual(is) encontrada(s) no DJEN`:'Sem comunicações processuais no DJEN',icon:'&#9878;'},
    {state:sancoesFalhouTudo?'warn':(sanTotal===0?'ok':'bad'),label:sancoesFalhouTudo?'Não foi possível verificar sanções/restrições':(sanTotal?`${sanTotal} sanção(ões)/restrição(ões) encontrada(s)`:'Sem sanções ou restrições'),icon:'&#128171;'},
    {state:dd2PepFalhou?'warn':(dd2PepData.length===0?'ok':'bad'),label:dd2PepFalhou?'Não foi possível verificar PEP':'Sem registro PEP',icon:'&#127963;'},
    {state:dd2MidiaFalhou?'warn':(dd2MidiaData.length===0?'ok':'bad'),label:dd2MidiaFalhou?'Não foi possível verificar mídia negativa automaticamente':'Sem notícias negativas',icon:'&#128240;'},
    {state:dd2DiariosData.length===0?'ok':'bad',label:dd2DiariosData.length?`${dd2DiariosData.length} menção(ões) em diários oficiais municipais`:'Sem menções em diários oficiais municipais',icon:'&#128240;'}
  ];
  if(document.getElementById('dd2-tipo').value==='cpf'){
    items.push({state:dd2BolsaData.length===0?'ok':'bad',label:dd2BolsaData.length?`Recebe Bolsa Família (${dd2BolsaData.length} parcela(s))`:'Não recebe Bolsa Família',icon:'&#128176;'});
  }
  el.innerHTML=items.map(i=>`<div class="dd2-chk-item ${i.state}">
    <span>${i.state==='ok'?'&#9989;':i.state==='warn'?'&#9888;&#65039;':'&#10060;'}</span>
    <span>${i.icon} ${i.label}</span>
  </div>`).join('');
}
