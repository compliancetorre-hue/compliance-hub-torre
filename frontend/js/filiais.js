function renderFiliais() {
  const q = document.getElementById('filtro-filial').value.toLowerCase();
  const grid = document.getElementById('filiais-grid');
  const items = DB.filiais.filter(f =>
    f.nome.toLowerCase().includes(q) || f.setor.toLowerCase().includes(q) ||
    (f.setores||'').toLowerCase().includes(q)
  );
  if(items.length === 0) { grid.innerHTML = '<div class="empty"><div class="ico">🏢</div>Nenhuma filial encontrada.</div>'; return; }
  grid.innerHTML = items.map(f => {
    const setoresArr = (f.setores||'').split(',').map(s=>s.trim()).filter(Boolean);
    const riscos = DB.riscos.filter(r => r.filial === f.nome).length;
    const controles = DB.controles.filter(c => c.filial === f.nome).length;
    const planos = DB.planos.filter(p => p.filial === f.nome).length;
    return `<div style="background:#fff;border-radius:12px;border:1px solid var(--border);padding:20px;position:relative">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="width:44px;height:44px;border-radius:10px;background:rgba(0,196,154,.1);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">🏢</div>
        <div>
          <div style="font-weight:700;font-size:.94rem;color:var(--primary)">${f.nome}</div>
          <div style="font-size:.76rem;color:var(--text-muted)">${f.cidade} · ${f.cnpj}</div>
        </div>
      </div>
      <div style="font-size:.8rem;margin-bottom:10px"><strong>Resp. Compliance:</strong> ${f.resp}</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
        ${setoresArr.map(s=>`<span style="background:#f0f4f8;border-radius:20px;padding:2px 10px;font-size:.73rem;font-weight:600;color:var(--text-muted)">${s}</span>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
        <div style="background:#f8fafc;border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:1.1rem;font-weight:700;color:var(--primary)">${riscos}</div>
          <div style="font-size:.7rem;color:var(--text-muted)">Riscos</div>
        </div>
        <div style="background:#f8fafc;border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:1.1rem;font-weight:700;color:var(--primary)">${controles}</div>
          <div style="font-size:.7rem;color:var(--text-muted)">Controles</div>
        </div>
        <div style="background:#f8fafc;border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:1.1rem;font-weight:700;color:var(--primary)">${planos}</div>
          <div style="font-size:.7rem;color:var(--text-muted)">Planos</div>
        </div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-outline btn-sm" onclick="editFilial(${f.id})">✏️ Editar</button>
        <button class="btn btn-danger btn-sm" onclick="delFilial(${f.id})">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function openModalFilial(id) {
  document.getElementById('f-filial-nome').value = '';
  document.getElementById('f-filial-cnpj').value = '';
  document.getElementById('f-filial-cidade').value = '';
  document.getElementById('f-filial-resp').value = '';
  document.getElementById('f-filial-setores').value = '';
  openModal('modal-filial');
}

function editFilial(id) {
  const f = DB.filiais.find(x => x.id === id);
  if(!f) return;
  document.getElementById('f-filial-nome').value = f.nome;
  document.getElementById('f-filial-cnpj').value = f.cnpj;
  document.getElementById('f-filial-cidade').value = f.cidade;
  document.getElementById('f-filial-resp').value = f.resp;
  document.getElementById('f-filial-setores').value = f.setores;
  document.getElementById('f-filial-setor').value = f.setor;
  openModal('modal-filial');
  // store edit target
  window._editFilialId = id;
}

function salvarFilial() {
  const nome = document.getElementById('f-filial-nome').value.trim();
  if(!nome) { alert('Informe o nome da filial.'); return; }
  if(window._editFilialId) {
    const f = DB.filiais.find(x => x.id === window._editFilialId);
    if(f) {
      f.nome = nome; f.cnpj = document.getElementById('f-filial-cnpj').value;
      f.cidade = document.getElementById('f-filial-cidade').value;
      f.resp = document.getElementById('f-filial-resp').value;
      f.setor = document.getElementById('f-filial-setor').value;
      f.setores = document.getElementById('f-filial-setores').value;
    }
    window._editFilialId = null;
  } else {
    DB.filiais.push({
      id: DB._ids.filial++,
      nome, cnpj: document.getElementById('f-filial-cnpj').value,
      cidade: document.getElementById('f-filial-cidade').value,
      resp: document.getElementById('f-filial-resp').value,
      setor: document.getElementById('f-filial-setor').value,
      setores: document.getElementById('f-filial-setores').value
    });
  }
  closeModal('modal-filial');
  populateFilialSelects();
  renderFiliais();
  const _fSaved = window._editFilialId
    ? DB.filiais.find(f => f.id === window._editFilialId)
    : DB.filiais[DB.filiais.length - 1];
  window._editFilialId = null;
  if(_fSaved) {
    saveLocalCache();
    sbSaveFilial(_fSaved).then(() => setSaveIndicator('☁️ Filial salva na nuvem','var(--accent)'));
  }
}

function delFilial(id) {
  if(!confirm('Excluir esta filial?')) return;
  DB.filiais = DB.filiais.filter(f => f.id !== id);
  populateFilialSelects();
  renderFiliais();
  saveLocalCache();
  sbDeleteFilial(id).then(() => setSaveIndicator('☁️ Filial excluída','var(--accent)'));
}
