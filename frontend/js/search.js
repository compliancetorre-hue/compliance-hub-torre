// ══════════════════════════════════════════
// BUSCA GLOBAL — pesquisa nos dados já carregados no frontend
// ══════════════════════════════════════════
const GS_CATEGORIAS = [
  { modulo:'canal-denuncia', label:'Denúncias', icon:'📢',
    fonte: () => DB.denuncias||[],
    match: (d,q) => [d.proto,d.cat,d.filial,d.setor].some(v=>(v||'').toLowerCase().includes(q)),
    titulo: d => `${d.proto||''} · ${d.cat||''}`,
    sub: d => [d.filial,d.setor].filter(Boolean).join(' · ') },
  { modulo:'mapa-risco', label:'Riscos', icon:'🗺️',
    fonte: () => DB.riscos||[],
    match: (r,q) => [r.desc,r.cat,r.filial].some(v=>(v||'').toLowerCase().includes(q)),
    titulo: r => r.desc||'',
    sub: r => [r.cat,r.filial].filter(Boolean).join(' · ') },
  { modulo:'controles', label:'Controles Internos', icon:'🛡️',
    fonte: () => DB.controles||[],
    match: (c,q) => [c.nome,c.desc,c.resp].some(v=>(v||'').toLowerCase().includes(q)),
    titulo: c => c.nome||'',
    sub: c => c.resp ? `Resp.: ${c.resp}` : '' },
  { modulo:'planos-acao', label:'Planos de Ação', icon:'📋',
    fonte: () => DB.planos||[],
    match: (p,q) => [p.titulo,p.resp,p.filial].some(v=>(v||'').toLowerCase().includes(q)),
    titulo: p => p.titulo||'',
    sub: p => p.resp ? `Resp.: ${p.resp}` : '' },
  { modulo:'mapa-risco', label:'Planos (Mapa de Risco)', icon:'📋',
    fonte: () => DB.rmPlanos||[],
    match: (p,q) => [p.titulo,p.resp].some(v=>(v||'').toLowerCase().includes(q)),
    titulo: p => p.titulo||'',
    sub: p => p.resp ? `Resp.: ${p.resp}` : '' },
  { modulo:'filiais', label:'Filiais e Setores', icon:'🏢',
    fonte: () => DB.filiais||[],
    match: (f,q) => [f.nome,f.setor,f.setores].some(v=>(v||'').toLowerCase().includes(q)),
    titulo: f => f.nome||'',
    sub: f => f.setor||'' },
  { modulo:'agenda', label:'Agenda', icon:'📅',
    fonte: () => DB.agenda||[],
    match: (e,q) => [e.titulo,e.desc,e.local,e.resp].some(v=>(v||'').toLowerCase().includes(q)),
    titulo: e => e.titulo||'',
    sub: e => e.data ? formatDate(e.data) : '' },
];

const GS_NAV = {
  'canal-denuncia': () => goto('canal-denuncia', document.querySelector('[data-page=canal-denuncia]')),
  'mapa-risco':     () => goto('mapa-risco', document.querySelector('[data-page=mapa-risco]')),
  'controles':      () => goto('controles', document.querySelector('[data-page=controles]')),
  'planos-acao':    () => goto('planos-acao', document.querySelector('[data-page=planos-acao]')),
  'filiais':        () => goto('filiais', document.querySelector('[data-page=filiais]')),
  'agenda':         () => goto('agenda', document.querySelector('[data-page=agenda]')),
};

function _gsNavigate(modulo) {
  (GS_NAV[modulo] || (()=>{}))();
  globalSearchClose();
}

function globalSearchInput(raw) {
  const box = document.getElementById('global-search-results');
  if(!box) return;
  const q = (raw||'').trim().toLowerCase();
  if(q.length < 2) { box.classList.remove('open'); box.innerHTML=''; return; }

  const grupos = GS_CATEGORIAS
    .filter(c => typeof canAccess !== 'function' || canAccess(c.modulo))
    .map(c => {
      const todos = c.fonte().filter(item => c.match(item,q));
      return { ...c, items: todos.slice(0,5), total: todos.length };
    })
    .filter(g => g.items.length);

  if(!grupos.length) {
    box.innerHTML = `<div class="gs-empty">Nenhum resultado para "${escapeHtml(raw.trim())}".</div>`;
    box.classList.add('open');
    return;
  }

  box.innerHTML = grupos.map(g => `
    <div class="gs-group">
      <div class="gs-group-title">${g.icon} ${g.label}</div>
      ${g.items.map(item => `
        <div class="gs-item" onclick="_gsNavigate('${g.modulo}')">
          <div class="gs-item-title">${escapeHtml(g.titulo(item))}</div>
          ${g.sub(item) ? `<div class="gs-item-sub">${escapeHtml(g.sub(item))}</div>` : ''}
        </div>`).join('')}
      ${g.total > g.items.length ? `<div class="gs-more">+${g.total-g.items.length} mais em ${g.label}</div>` : ''}
    </div>`).join('');
  box.classList.add('open');
}

function globalSearchClose() {
  const box = document.getElementById('global-search-results');
  if(box) { box.classList.remove('open'); box.innerHTML=''; }
  const inp = document.getElementById('global-search-input');
  if(inp) inp.value='';
}

function globalSearchKeydown(e) {
  if(e.key === 'Escape') { e.target.blur(); globalSearchClose(); }
}

document.addEventListener('click', e => {
  const wrap = document.getElementById('global-search-wrap');
  if(wrap && !wrap.contains(e.target)) globalSearchClose();
});
