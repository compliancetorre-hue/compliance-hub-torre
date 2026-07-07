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
.dd2-filter-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.dd2-filter-bar select{padding:6px 10px;border-radius:6px;border:1px solid #e2e8f0;font-size:.82rem;font-family:inherit}
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
@media print{.dd2-search,.dd2-export-btns,.dd2-filter-bar{display:none!important}.dd2-card{break-inside:avoid;box-shadow:none}}
</style>
<div class="dd2-container">
  <div class="dd2-search">
    <h2>&#128269; Investigação Prévia — Due Diligence 2</h2>
    <div class="dd2-form-row">
      <div class="dd2-form-group">
        <label>Tipo</label>
        <select id="dd2-tipo" onchange="dd2FormatDoc(document.getElementById('dd2-doc'))">
          <option value="cnpj">&#127970; CNPJ</option>
          <option value="cpf">&#128100; CPF</option>
        </select>
      </div>
      <div class="dd2-form-group" style="flex:1;min-width:200px">
        <label>Documento</label>
        <input type="text" id="dd2-doc" placeholder="00.000.000/0001-00" maxlength="18" oninput="dd2FormatDoc(this)"/>
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
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-sancoes" checked> &#128171; Sanções CEIS/CNEP</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-pep" checked> &#127963; PEP</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-midia"> &#128240; Mídia Negativa</label>
      <label class="dd2-scope-item"><input type="checkbox" id="dd2-sc-bolsa" checked> &#128176; Bolsa Família (CPF)</label>
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
      <div class="dd2-card-title">&#9878; Processos Judiciais (DataJud CNJ)</div>
      <div class="dd2-filter-bar" id="dd2-judicial-filters" style="display:none">
        <select id="dd2-f-tribunal" onchange="dd2FiltrarJudicial()"><option value="">Todos os Tribunais</option></select>
        <select id="dd2-f-grau" onchange="dd2FiltrarJudicial()"><option value="">Todos os Graus</option></select>
        <select id="dd2-f-polo" onchange="dd2FiltrarJudicial()"><option value="">Todos os Polos</option></select>
      </div>
      <div id="dd2-judicial-content"><div class="dd2-loading">&#9203; Consultando DataJud CNJ...</div></div>
    </div>
    <div class="dd2-card" id="dd2-sec-sancoes">
      <div class="dd2-card-title">&#128171; Sanções CEIS + CNEP</div>
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

// DD2_API removido — chamadas migradas para APIs públicas diretas
const DD2_DATAJUD_KEY = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==';

// A chave da API do Portal da Transparência é PESSOAL e NUNCA deve existir no
// cliente (ficaria visível a qualquer visitante via "Ver código-fonte"). As
// consultas passam pela Edge Function, que guarda a chave como secret do lado
// do servidor — ver rota /portal/:endpoint documentada junto ao backend.
function dd2PortalHeaders(){
  return { 'x-app-token': (typeof getAppToken==='function'?getAppToken():'') };
}
function dd2PortalUrl(rota, params){
  return `${EDGE_URL}/portal/${rota}?${params}`;
}
const DD2_TRIBUNAIS = [
  {sigla:'TJSP',nome:'TJSP'},
  {sigla:'TJRJ',nome:'TJRJ'},
  {sigla:'TJMG',nome:'TJMG'},
  {sigla:'TJRS',nome:'TJRS'},
  {sigla:'TJPR',nome:'TJPR'},
  {sigla:'TJSC',nome:'TJSC'},
  {sigla:'TJBA',nome:'TJBA'},
  {sigla:'TJGO',nome:'TJGO'},
  {sigla:'TJPE',nome:'TJPE'},
  {sigla:'TJCE',nome:'TJCE'},
  {sigla:'TJAM',nome:'TJAM'},
  {sigla:'TJMT',nome:'TJMT'},
  {sigla:'TJMS',nome:'TJMS'},
  {sigla:'TJPA',nome:'TJPA'},
  {sigla:'TJDF',nome:'TJDF'},
  {sigla:'TST',nome:'TST'},
  {sigla:'STJ',nome:'STJ'}
];

let dd2JudicialData = [];
let dd2CadastralData = null;
let dd2SancoesData = {ceis:[],cnep:[]};
let dd2PepData = [];
let dd2MidiaData = [];
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
  const scCad=document.getElementById('dd2-sc-cadastral').checked;
  const scFis=document.getElementById('dd2-sc-fiscal').checked;
  const scJud=document.getElementById('dd2-sc-judicial').checked;
  const scSan=document.getElementById('dd2-sc-sancoes').checked;
  const scPep=document.getElementById('dd2-sc-pep').checked;
  const scMid=document.getElementById('dd2-sc-midia').checked;
  const scBolsa=document.getElementById('dd2-sc-bolsa').checked;
  document.getElementById('dd2-progress').style.display='block';
  document.getElementById('dd2-report').style.display='none';
  document.getElementById('dd2-sec-midia').style.display=scMid?'block':'none';
  document.getElementById('dd2-sec-bolsa').style.display=scBolsa?'block':'none';
  dd2SetProgress(5);
  dd2JudicialData=[];dd2CadastralData=null;dd2SancoesData={ceis:[],cnep:[]};dd2PepData=[];dd2MidiaData=[];dd2BolsaData=[];
  const tasks=[];

  // Failsafe: se alguma chamada travar inesperadamente, libera a tela mesmo assim
  let failsafeAcionado=false;
  const failsafe=setTimeout(()=>{
    failsafeAcionado=true;
    console.warn('DD2: failsafe acionado');
    document.getElementById('dd2-progress').style.display='none';
    document.getElementById('dd2-report').style.display='block';
  },30000);

  try {
  if(scCad&&tipo==='cnpj'){
    dd2SetStep('cadastral','active');
    tasks.push(
      dd2BuscarCNPJ(doc)
        .then(d=>{
          dd2CadastralData=d;
          dd2SetStep('cadastral','done');
          dd2SetProgress(20);
          dd2RenderCadastral(d);
          dd2RenderFiscal(d);
        }).catch(()=>{
          dd2SetStep('cadastral','error');
          dd2RenderCadastral(null);
          dd2RenderFiscal(null);
        })
    );
  } else {
    dd2SetStep('cadastral','done');dd2SetProgress(20);
    document.getElementById('dd2-cadastral-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta cadastral disponível apenas para CNPJ.</p>';
    document.getElementById('dd2-fiscal-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta fiscal disponível apenas para CNPJ.</p>';
  }
  if(scJud){
    dd2SetStep('judicial','active');
    tasks.push(
      dd2FetchJudicial(doc).then(()=>{
        dd2SetStep('judicial','done');dd2SetProgress(50);
      }).catch(()=>{dd2SetStep('judicial','error');dd2RenderJudicial([]);})
    );
  } else {
    dd2SetStep('judicial','done');
    document.getElementById('dd2-judicial-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta judicial não selecionada.</p>';
  }
  if(scSan){
    dd2SetStep('sancoes','active');
    tasks.push(
      Promise.all([
        fetch(dd2PortalUrl('ceis','codigoSancionado='+doc+'&pagina=1'),{headers:dd2PortalHeaders(),signal:AbortSignal.timeout(10000)}).then(r=>r.ok?r.json():[]).catch(()=>[]),
        fetch(dd2PortalUrl('cnep','codigoSancionado='+doc+'&pagina=1'),{headers:dd2PortalHeaders(),signal:AbortSignal.timeout(10000)}).then(r=>r.ok?r.json():[]).catch(()=>[])
      ]).then(([ceis,cnep])=>{
        dd2SancoesData={ceis:Array.isArray(ceis)?ceis:[],cnep:Array.isArray(cnep)?cnep:[]};
        dd2SetStep('sancoes','done');dd2SetProgress(65);
        dd2RenderSancoes(dd2SancoesData);
      }).catch(()=>{dd2SetStep('sancoes','error');dd2RenderSancoes({ceis:[],cnep:[]});})
    );
  } else {
    dd2SetStep('sancoes','done');
    document.getElementById('dd2-sancoes-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta de sanções não selecionada.</p>';
  }
  if(scPep){
    dd2SetStep('pep','active');
    tasks.push(
      (async()=>{
        const nome=dd2CadastralData?.razao||'';
        return dd2FetchPep(nome,tipo==='cpf'?doc:'');
      })().then(d=>{
        dd2PepData=d;dd2SetStep('pep','done');dd2SetProgress(78);
        dd2RenderPep(d);
      }).catch(()=>{dd2SetStep('pep','error');dd2RenderPep([]);})
    );
  } else {
    dd2SetStep('pep','done');
    document.getElementById('dd2-pep-content').innerHTML='<p style="color:#64748b;font-size:.85rem">Consulta PEP não selecionada.</p>';
  }
  if(scMid){
    dd2SetStep('midia','active');
    tasks.push(
      (async()=>{
        const nome=dd2CadastralData?.razao||doc;
        return fetch('https://corsproxy.io/?url='+encodeURIComponent('https://api.duckduckgo.com/?q='+encodeURIComponent(nome+' corrupção fraude escândalo')+'&format=json&no_html=1&skip_disambig=1'),{signal:AbortSignal.timeout(10000)})
          .then(r=>r.ok?r.json():null)
          .then(d=>{
            const items=(d?.RelatedTopics||[]).filter(t=>t.FirstURL&&t.Text).map(t=>({link:t.FirstURL,title:t.Text,source:{name:'DuckDuckGo'},pubDate:'',content_text:t.Text}));
            dd2MidiaData=items;dd2SetStep('midia','done');dd2SetProgress(88);
            dd2RenderMidia(dd2MidiaData);
          });
      })().catch(()=>{dd2SetStep('midia','error');dd2RenderMidia([]);})
    );
  } else { dd2SetStep('midia','done'); }
  if(scBolsa&&tipo==='cpf'){
    dd2SetStep('bolsa','active');
    tasks.push(
      dd2FetchBolsaFamilia(doc).then(d=>{
        dd2BolsaData=d;dd2SetStep('bolsa','done');dd2SetProgress(92);
        dd2RenderBolsaFamilia(d);
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

async function dd2FetchJudicial(doc,headers){
  const results=[];
  const calls=DD2_TRIBUNAIS.map(t=>
    fetch('https://api-publica.datajud.cnj.jus.br/api_publica_'+t.sigla.toLowerCase()+'/_search',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'APIKey '+DD2_DATAJUD_KEY},
      body:JSON.stringify({query:{bool:{should:[{match:{numeroProcesso:doc}},{match:{cpfCnpj:doc}}]}},size:50}),
      signal:AbortSignal.timeout(15000)
    }).then(r=>r.ok?r.json():null).then(d=>{
      if(d?.hits?.hits?.length){
        d.hits.hits.forEach(h=>{const s=h._source||{};results.push({...s,_tribunal:t.sigla});});
      }
    }).catch(()=>{})
  );
  await Promise.allSettled(calls);
  dd2JudicialData=results;
  dd2RenderJudicial(results);
}

async function dd2FetchPep(nome,cpf){
  if(!nome&&!cpf)return[];
  // Busca exata por CPF quando disponível (muito mais precisa que por nome)
  const qs=cpf?('cpf='+cpf):('nome='+encodeURIComponent(nome.split(' ').slice(0,3).join(' ')));
  const r=await fetch(dd2PortalUrl('peps',qs+'&pagina=1'),{headers:dd2PortalHeaders(),signal:AbortSignal.timeout(10000)});
  if(!r.ok)return[];
  const d=await r.json();
  return Array.isArray(d)?d:[];
}

// Consulta se o CPF/NIS recebeu parcelas do Bolsa Família (Portal da Transparência).
async function dd2FetchBolsaFamilia(cpf){
  const r=await fetch(dd2PortalUrl('bolsa-familia','codigo='+cpf+'&pagina=1'),{
    headers:dd2PortalHeaders(),signal:AbortSignal.timeout(10000)
  });
  if(!r.ok) throw new Error('Falha ao consultar Bolsa Família');
  const d=await r.json();
  return Array.isArray(d)?d:[];
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

function dd2RenderJudicial(data){
  const el=document.getElementById('dd2-judicial-content');
  const filters=document.getElementById('dd2-judicial-filters');
  if(!data.length){el.innerHTML='<p style="color:#22c55e;font-weight:600">✅ Nenhum processo encontrado nos tribunais consultados.</p>';return;}
  filters.style.display='flex';
  const tribunais=[...new Set(data.map(p=>p._tribunal||p.tribunal||'—'))].sort();
  const graus=[...new Set(data.map(p=>p.grau||'—'))].filter(Boolean).sort();
  const tSel=document.getElementById('dd2-f-tribunal');
  const gSel=document.getElementById('dd2-f-grau');
  tSel.innerHTML='<option value="">Todos os Tribunais ('+data.length+')</option>'+tribunais.map(t=>`<option>${t}</option>`).join('');
  gSel.innerHTML='<option value="">Todos os Graus</option>'+graus.map(g=>`<option>${g}</option>`).join('');
  dd2FiltrarJudicial();
}

function dd2FiltrarJudicial(){
  const tribunal=document.getElementById('dd2-f-tribunal')?.value||'';
  const grau=document.getElementById('dd2-f-grau')?.value||'';
  const polo=document.getElementById('dd2-f-polo')?.value||'';
  let filtered=dd2JudicialData;
  if(tribunal)filtered=filtered.filter(p=>(p._tribunal||p.tribunal||'')==tribunal);
  if(grau)filtered=filtered.filter(p=>(p.grau||'')==grau);
  const el=document.getElementById('dd2-judicial-content');
  if(!filtered.length){el.innerHTML='<p style="color:#64748b">Nenhum processo encontrado com os filtros selecionados.</p>';return;}
  el.innerHTML=`<p style="font-size:.82rem;color:#64748b;margin-bottom:8px">Exibindo ${filtered.length} processo(s)</p>
  <div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th>Número CNJ</th><th>Classe / Assunto</th><th>Tribunal</th><th>Grau</th><th>Últ. Atualização</th></tr></thead>
  <tbody>${filtered.slice(0,100).map(p=>{
    const num=p.numeroProcesso||p.numero||'—';
    const classe=p.classe?.nome||p.classe||'—';
    const assunto=(p.assuntos||[]).map(a=>a.nome||a).join(', ')||'—';
    const trib=p._tribunal||p.tribunal||'—';
    const grauP=p.grau||'—';
    const upd=p.dataHoraUltimaAtualizacao||p.dataAjuizamento||'—';
    return `<tr><td style="font-family:monospace;font-size:.75rem">${num}</td><td>${classe}<br><span style="font-size:.73rem;color:#64748b">${assunto}</span></td><td><span class="dd2-badge info">${trib}</span></td><td>${grauP}</td><td style="font-size:.75rem">${upd.substring(0,10)}</td></tr>`;
  }).join('')}</tbody></table></div>`;
}

function dd2RenderSancoes(d){
  const el=document.getElementById('dd2-sancoes-content');
  const ceis=d?.ceis||[];
  const cnep=d?.cnep||[];
  const all=[...ceis.map(s=>({...s,_base:'CEIS'})),...cnep.map(s=>({...s,_base:'CNEP'}))];
  if(!all.length){el.innerHTML='<p style="color:#22c55e;font-weight:600">✅ Nenhuma sanção encontrada nas bases CEIS/CNEP.</p>';return;}
  el.innerHTML=`<div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th>Base</th><th>Tipo de Sanção</th><th>Órgão Sancionador</th><th>Vigência</th><th>Status</th></tr></thead>
  <tbody>${all.map(s=>`<tr><td><span class="dd2-badge danger">${s._base}</span></td><td>${escapeHtml(s.tipoSancao?.descricaoPortal||s.tipoSancao?.descricaoResumida)||'—'}</td><td>${escapeHtml(s.orgaoSancionador?.nome)||'—'}</td><td>${escapeHtml(s.dataInicioSancao)||'—'} – ${escapeHtml(s.dataFimSancao)||'vigente'}</td><td><span class="dd2-badge ${s.dataFimSancao?'warn':'danger'}">${s.dataFimSancao?'Encerrada':'Vigente'}</span></td></tr>`).join('')}</tbody></table></div>`;
}

function dd2RenderPep(data){
  const el=document.getElementById('dd2-pep-content');
  if(!Array.isArray(data)||!data.length){el.innerHTML='<p style="color:#22c55e;font-weight:600">✅ Nenhum registro PEP encontrado.</p>';return;}
  el.innerHTML=`<div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th>Nome</th><th>Cargo / Função</th><th>Órgão</th><th>Período</th><th>Status</th></tr></thead>
  <tbody>${data.slice(0,50).map(p=>`<tr><td>${escapeHtml(p.nome)||'—'}</td><td>${escapeHtml(p.descricao_funcao)||'—'}</td><td>${escapeHtml(p.nome_orgao)||'—'}</td><td>${escapeHtml(p.dt_inicio_exercicio)||'—'} – ${escapeHtml(p.dt_fim_exercicio)||'atual'}</td><td><span class="dd2-badge pep">&#9888; PEP</span></td></tr>`).join('')}</tbody></table></div>`;
}

function dd2RenderBolsaFamilia(data){
  const el=document.getElementById('dd2-bolsa-content');
  if(!Array.isArray(data)){el.innerHTML='<p style="color:#ef4444">Não foi possível consultar o Bolsa Família no momento.</p>';return;}
  if(!data.length){el.innerHTML='<p style="color:#22c55e;font-weight:600">✅ Nenhuma parcela de Bolsa Família encontrada para este CPF.</p>';return;}
  el.innerHTML=`<div style="overflow-x:auto"><table class="dd2-table"><thead><tr><th>Mês Referência</th><th>UF</th><th>Município</th><th>NIS</th><th>Beneficiário</th><th>Valor</th></tr></thead>
  <tbody>${data.slice(0,50).map(p=>`<tr>
    <td>${escapeHtml(p.dataMesReferencia||p.dataMesCompetencia)||'—'}</td>
    <td>${escapeHtml(p.municipio?.uf?.sigla)||'—'}</td>
    <td>${escapeHtml(p.municipio?.nomeIBGE)||'—'}</td>
    <td>${escapeHtml(p.titularBolsaFamilia?.nis)||'—'}</td>
    <td>${escapeHtml(p.titularBolsaFamilia?.nome)||'—'}</td>
    <td>${p.valor!=null?'R$ '+Number(p.valor).toLocaleString('pt-BR',{minimumFractionDigits:2}):'—'}</td>
  </tr>`).join('')}</tbody></table></div>
  <div class="dd2-links-ext"><a href="https://portaldatransparencia.gov.br/beneficios/novo-bolsa-familia" target="_blank" class="dd2-link-ext">🔗 Ver no Portal da Transparência</a></div>`;
}

function dd2RenderMidia(data){
  const el=document.getElementById('dd2-midia-content');
  if(!data.length){el.innerHTML='<p style="color:#22c55e;font-weight:600">✅ Nenhuma notícia negativa encontrada.</p>';return;}
  el.innerHTML=data.slice(0,20).map(n=>`<div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:8px;background:#fff">
    <div style="font-weight:600;font-size:.88rem;margin-bottom:4px"><a href="${n.link||'#'}" target="_blank" style="color:#0f2d4a;text-decoration:none">${n.title||'Sem título'}</a></div>
    <div style="font-size:.78rem;color:#64748b">${n.pubDate||''} — ${n.source?.name||n.author||''}</div>
    <div style="font-size:.82rem;color:#64748b;margin-top:4px">${(n.content_text||n.description||'').substring(0,200)}...</div>
  </div>`).join('');
}

function dd2RenderScore(){
  const gauge=document.getElementById('dd2-gauge');
  const label=document.getElementById('dd2-gauge-label');
  const pillarsEl=document.getElementById('dd2-pillars');
  let score=0;
  const d=dd2CadastralData;
  const sit=d?.situacao||'';
  if(sit&&!sit.toUpperCase().includes('ATIVA')&&!sit.toUpperCase().includes('REGULAR'))score+=30;
  const sanTotal=(dd2SancoesData?.ceis||[]).length+(dd2SancoesData?.cnep||[]).length;
  if(sanTotal>0)score=Math.min(100,score+40);
  if(dd2PepData.length>0)score=Math.min(100,score+20);
  score=Math.min(100,score);
  gauge.textContent=score;
  if(score<25){gauge.className='dd2-gauge-circle low';label.textContent='RISCO BAIXO';label.style.color='#22c55e';}
  else if(score<60){gauge.className='dd2-gauge-circle medium';label.textContent='RISCO MÉDIO';label.style.color='#f59e0b';}
  else{gauge.className='dd2-gauge-circle high';label.textContent='RISCO ALTO';label.style.color='#ef4444';}
  const pillars=[
    {icon:'&#127963;',label:'Cadastral',ok:!sit||sit.toUpperCase().includes('ATIVA')||sit.toUpperCase().includes('REGULAR')},
    {icon:'&#9878;',label:'Judicial',ok:dd2JudicialData.length===0},
    {icon:'&#128171;',label:'Sanções',ok:sanTotal===0},
    {icon:'&#127963;',label:'PEP',ok:dd2PepData.length===0},
    {icon:'&#128240;',label:'Mídia',ok:dd2MidiaData.length===0}
  ];
  pillarsEl.innerHTML=pillars.map(p=>`<div class="dd2-pillar">
    <div class="dd2-pillar-icon">${p.icon}</div>
    <div class="dd2-pillar-label">${p.label}</div>
    <div class="dd2-pillar-status ${p.ok?'ok':'bad'}">${p.ok?'OK':'Atenção'}</div>
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
    const dt=(p.dataAjuizamento||p.dataHoraUltimaAtualizacao||'').substring(0,10);
    if(dt)events.push({date:dt,text:'Processo: '+(p.classe?.nome||p.classe||'Processo judicial'),sub:p._tribunal||p.tribunal||'DataJud',cls:'warn'});
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
  const sanTotal=(dd2SancoesData?.ceis||[]).length+(dd2SancoesData?.cnep||[]).length;
  const items=[
    {ok:!!d,label:'Dados cadastrais obtidos',icon:'&#127963;'},
    {ok:!sit||sit.toUpperCase().includes('ATIVA')||sit.toUpperCase().includes('REGULAR'),label:'Situação cadastral regular',icon:'&#128188;'},
    {ok:dd2JudicialData.length===0,label:'Sem processos judiciais',icon:'&#9878;'},
    {ok:sanTotal===0,label:'Sem sanções CEIS/CNEP',icon:'&#128171;'},
    {ok:dd2PepData.length===0,label:'Sem registro PEP',icon:'&#127963;'},
    {ok:dd2MidiaData.length===0,label:'Sem notícias negativas',icon:'&#128240;'}
  ];
  if(document.getElementById('dd2-tipo').value==='cpf'){
    items.push({ok:dd2BolsaData.length===0,label:dd2BolsaData.length?`Recebe Bolsa Família (${dd2BolsaData.length} parcela(s))`:'Não recebe Bolsa Família',icon:'&#128176;'});
  }
  el.innerHTML=items.map(i=>`<div class="dd2-chk-item ${i.ok?'ok':'bad'}">
    <span>${i.ok?'&#9989;':'&#10060;'}</span>
    <span>${i.icon} ${i.label}</span>
  </div>`).join('');
}
