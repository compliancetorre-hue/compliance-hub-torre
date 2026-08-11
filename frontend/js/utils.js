// ══════════════════════════════════════════
// Escapa texto de origem não confiável antes de inserir via innerHTML
function escapeHtml(str) {
  if(str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function formatDate(d) {
  if(!d) return '—';
  const [y,m,dd] = d.split('-');
  return `${dd}/${m}/${y}`;
}
function diasAte(d) {
  if(!d) return null;
  const diff = Math.ceil((new Date(d) - new Date()) / 86400000);
  return diff;
}
function prazoChip(d) {
  const diff = diasAte(d);
  if(diff === null) return '—';
  if(diff < 0) return `<span class="prazo-venc">⚠ ${Math.abs(diff)}d atrás</span>`;
  if(diff <= 7) return `<span class="prazo-warn">⏰ ${diff}d</span>`;
  return `<span class="prazo-ok">📅 ${formatDate(d)}</span>`;
}
function statusBadge(s) {
  const map = {
    'Alto':'badge-alto','Médio':'badge-medio','Baixo':'badge-baixo','Crítico':'badge-critico',
    'Aberta':'badge-aberta','Em Análise':'badge-analise','Encerrada':'badge-encerrada','Arquivada':'badge-arquivada',
    'Pendente':'badge-pendente','Concluído':'badge-concluido','Vencido':'badge-vencido',
    'Em Andamento':'badge-andamento','Não Iniciado':'badge-naoinitiado',
    'Crítica':'badge-critico','Alta':'badge-alto','Média':'badge-medio','Baixa':'badge-baixo',
  };
  return `<span class="badge ${map[s]||'badge-pendente'}">${s}</span>`;
}
function nivelRisco(p, i) {
  const score = p * i;
  if(score >= 150) return 'Crítico';
  if(score >= 75)  return 'Alto';
  if(score >= 25)  return 'Médio';
  if(score >= 16)  return 'Crítico';
  if(score >= 9)   return 'Alto';
  if(score >= 4)   return 'Médio';
  return 'Baixo';
}
function progBar(v, cls='teal') {
  return `<div style="min-width:80px"><div style="font-size:.75rem;font-weight:600;color:var(--text-muted)">${v}%</div><div class="prog-bar"><div class="prog-fill ${cls}" style="width:${v}%"></div></div></div>`;
}

// ══════════════════════════════════════════
// CNPJ / CPF — máscara, formatação e fontes de consulta
// Compartilhado entre due-diligence.js e due-diligence2.js (antes cada um
// tinha sua própria cópia dessa lógica — juntado aqui pra corrigir num
// lugar só, ex: quando a Receita passou a aceitar CNPJ alfanumérico).
// ══════════════════════════════════════════

// CNPJ alfanumérico (Receita Federal, regra 2026): raiz+ordem (12 primeiras
// posições) aceitam letra A-Z além de número — só os 2 dígitos
// verificadores finais são sempre numéricos. \D removeria as letras e
// corromperia o documento; esta função remove só pontuação/espaço.
function soAlfanum(v) { return (v||'').toUpperCase().replace(/[^0-9A-Z]/g,''); }

// Máscara de CNPJ (00.000.000/0000-00) aplicada durante a digitação —
// aceita letra nas 12 primeiras posições.
function maskCnpj(v) {
  v=soAlfanum(v).substring(0,14);
  v=v.replace(/([0-9A-Z]{2})([0-9A-Z])/,'$1.$2');
  v=v.replace(/([0-9A-Z]{3})([0-9A-Z])/,'$1.$2');
  v=v.replace(/([0-9A-Z]{3})([0-9A-Z])/,'$1/$2');
  v=v.replace(/([0-9A-Z]{4})([0-9A-Z])/,'$1-$2');
  return v;
}

// Máscara de CPF (000.000.000-00) aplicada durante a digitação.
function maskCpf(v) {
  v=(v||'').replace(/\D/g,'').substring(0,11);
  v=v.replace(/(\d{3})(\d)/,'$1.$2');
  v=v.replace(/(\d{3})(\d)/,'$1.$2');
  v=v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  return v;
}

// Formata um CNPJ/CPF já completo (sem máscara) pro formato de exibição.
function fmtCnpj(docNum) { return soAlfanum(docNum).replace(/^([0-9A-Z]{2})([0-9A-Z]{3})([0-9A-Z]{3})([0-9A-Z]{4})(\d{2})$/,'$1.$2.$3/$4-$5'); }
function fmtCpf(docNum) { return (docNum||'').replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,'$1.$2.$3-$4'); }

// As 3 APIs públicas de CNPJ (BrasilAPI, ReceitaWS, CNPJ.ws), consultadas
// em cascata com fallback — mesma lista usada nos dois módulos de Due
// Diligence.
function cnpjApisList(doc) {
  return [
    {name:'BrasilAPI',url:`https://brasilapi.com.br/api/cnpj/v1/${doc}`},
    {name:'ReceitaWS',url:`https://www.receitaws.com.br/v1/cnpj/${doc}`},
    {name:'CNPJ.ws',url:`https://publica.cnpj.ws/cnpj/${doc}`},
  ];
}

// ══════════════════════════════════════════
// FILIAL SELECTS
// ══════════════════════════════════════════
function populateFilialSelects() {
  const ids = ['f-risco-filial','f-ctrl-filial','f-plano-filial','f-dn-filial',
                'filtro-risco-filial','filtro-ctrl-filial','filtro-plano-filial','filtro-dn-filial','filtro-dn-filial2'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    const isFilter = id.startsWith('filtro');
    el.innerHTML = isFilter ? '<option value="">Todas as filiais</option>' : '';
    DB.filiais.forEach(f => {
      el.innerHTML += `<option value="${f.nome}">${f.nome}</option>`;
    });
  });
}

// ══════════════════════════════════════════
// MOBILE
// ══════════════════════════════════════════
function toggleMobile() {
  document.getElementById('sidebar').classList.toggle('mobile-open');
  document.getElementById('mobile-overlay').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('mobile-overlay').classList.remove('open');
}

// saveDB = salva cache local + agenda sync Supabase
let _saveTimer = null;
function saveDB() {
  saveLocalCache();
  setSaveIndicator('💾 Salvando...', 'var(--warn)');
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => setSaveIndicator('✅ Salvo localmente', 'var(--accent)'), 500);
}

function setSaveIndicator(text, color) {
  const el = document.getElementById('save-indicator');
  if(!el) return;
  el.textContent = text; el.style.color = color;
}

function getDBSizeKB() {
  try { const r = localStorage.getItem(DB_KEY); return r ? (r.length/1024).toFixed(1):'0'; } catch(e){ return '?'; }
}

// ── Loading bar for Supabase ops
function showLoadingBar(show, msg='') {
  let bar = document.getElementById('sb-loading');
  if(!bar) {
    bar = document.createElement('div');
    bar.id = 'sb-loading';
    bar.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;height:3px;background:var(--accent);animation:sbload 1.5s ease-in-out infinite;display:none;transition:opacity .3s';
    const style = document.createElement('style');
    style.textContent = '@keyframes sbload{0%{left:0;right:100%}50%{left:0;right:0}100%{left:100%;right:0}}';
    document.head.appendChild(style);
    document.body.appendChild(bar);
  }
  bar.style.display = show ? 'block' : 'none';
  if(msg) setSaveIndicator('⏳ ' + msg, 'var(--warn)');
}
