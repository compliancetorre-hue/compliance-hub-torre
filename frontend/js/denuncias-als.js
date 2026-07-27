// ══════════════════════════════════════════════════════════
// CANAL DE DENÚNCIA ALS
// Segundo canal de denúncia, totalmente separado do Canal de
// Denúncia original (tabela "denuncias_als", não "denuncias").
// As respostas chegam aqui via formulário público
// (frontend/denuncia-als-publica.html) + Edge Function
// "denuncia-als-publica" — sem precisar de login.
// ══════════════════════════════════════════════════════════

function getFilteredAls() {
  const q = (document.getElementById('filtro-dnals-txt')||{value:''}).value.toLowerCase();
  const tipo = (document.getElementById('filtro-dnals-tipo')||{value:''}).value;
  const status = (document.getElementById('filtro-dnals-status')||{value:''}).value;

  return (DB.denunciasAls||[]).filter(d => {
    if(tipo && !(d.tipos||[]).includes(tipo)) return false;
    if(status && d.status !== status) return false;
    if(q) {
      const hay = `${d.proto} ${(d.tipos||[]).join(' ')} ${d.denunciado} ${d.setor}`.toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  }).sort((a,b) => (b.id||0) - (a.id||0));
}

function renderDenunciasAls() {
  const all = DB.denunciasAls || [];
  const filtered = getFilteredAls();
  const tbody = document.getElementById('tb-denuncias-als');
  if(!tbody) return;

  document.getElementById('dnals-total').textContent = all.length;
  document.getElementById('dnals-abertas').textContent = all.filter(d => d.status === 'Aberta').length;
  document.getElementById('dnals-analise').textContent = all.filter(d => d.status === 'Em Análise').length;
  document.getElementById('dnals-encerradas').textContent = all.filter(d => d.status === 'Encerrada' || d.status === 'Arquivada').length;
  document.getElementById('dnals-sla-venc').textContent = all.filter(d => alsDiasDecorridos(d) > 90 && !['Encerrada','Arquivada'].includes(d.status)).length;

  if(filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="empty">Nenhuma denúncia ALS encontrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(d => {
    const tipos = (d.tipos||[]).join(', ') + (d.tipoOutro ? ` (${d.tipoOutro})` : '');
    const identificado = (d.nome || d.telefone || d.email) ? '👤 Identificada' : '🕵️ Anônima';
    const respondida = d.resposta ? '✉️ Respondida' : '⏳ Pendente';
    return `<tr>
      <td style="font-family:'DM Mono',monospace;font-size:.8rem">${d.proto||'—'}</td>
      <td>${tipos || '—'}</td>
      <td>${d.setor || '—'}</td>
      <td>${d.denunciado || '—'}</td>
      <td>${d.criadoEm ? formatDate(d.criadoEm.split('T')[0]) : '—'}</td>
      <td>${identificado}</td>
      <td>${statusBadge(d.status)}<div style="font-size:.7rem;color:var(--text-muted);margin-top:2px">${respondida}</div></td>
      <td style="min-width:120px">${d.criadoEm ? slaBar(d.criadoEm.split('T')[0], d.status) : '—'}</td>
      <td>${d.resp || '—'}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="openAlsDetail(${d.id})">👁️ Ver</button>
      </td>
    </tr>`;
  }).join('');
}

// Mesma contagem do Canal de Denúncia original: dias corridos desde o
// recebimento (criadoEm), sem contar depois que a denúncia é fechada.
function alsDiasDecorridos(d) {
  if(!d.criadoEm) return 0;
  return Math.max(0, Math.floor((new Date() - new Date(d.criadoEm)) / 86400000));
}

function openAlsDetail(id) {
  const d = (DB.denunciasAls||[]).find(x => x.id === id);
  if(!d) return;
  window._editDnAlsId = id;

  document.getElementById('dnals-detail-proto').textContent = d.proto;
  document.getElementById('dnals-detail-status').innerHTML = statusBadge(d.status);
  document.getElementById('dnals-detail-meta').textContent =
    `${d.setor ? d.setor+' · ' : ''}${d.criadoEm ? formatDate(d.criadoEm.split('T')[0]) : ''}`;

  document.getElementById('dnals-detail-sla').innerHTML =
    d.criadoEm ? slaBar(d.criadoEm.split('T')[0], d.status) : '—';

  const tipos = (d.tipos||[]).join(', ') + (d.tipoOutro ? ` (Outra: ${d.tipoOutro})` : '');
  document.getElementById('dnals-detail-tipos').textContent = tipos || '—';
  document.getElementById('dnals-detail-denunciado').textContent = d.denunciado || '—';
  document.getElementById('dnals-detail-onde').textContent = d.onde || '—';
  document.getElementById('dnals-detail-quando').textContent =
    `${d.quando ? formatDate(d.quando) : '—'}${d.horario ? ' · '+d.horario : ''}`;

  const idWrap = document.getElementById('dnals-detail-identificado-wrap');
  const hasId = !!(d.nome || d.telefone || d.email);
  idWrap.style.display = hasId ? '' : 'none';
  if(hasId) {
    const setField = (elId, val) => {
      const el = document.getElementById(elId);
      el.style.display = val ? '' : 'none';
      if(val) el.querySelector('strong').textContent = val;
    };
    setField('dnals-detail-id-nome', d.nome);
    setField('dnals-detail-id-tel', d.telefone);
    setField('dnals-detail-id-email', d.email);
  }

  document.getElementById('dnals-detail-descricao').textContent = d.descricao || '—';

  const testWrap = document.getElementById('dnals-detail-testemunhas-wrap');
  if(d.testemunhas) { testWrap.style.display=''; document.getElementById('dnals-detail-testemunhas').textContent = d.testemunhas; }
  else testWrap.style.display='none';

  document.getElementById('dnals-detail-status-sel').value = d.status || 'Aberta';
  document.getElementById('dnals-detail-resp').value = d.resp || '';
  document.getElementById('dnals-detail-obs').value = d.obs || '';
  document.getElementById('dnals-detail-resposta').value = d.resposta || '';
  document.getElementById('dnals-detail-resposta-em').textContent =
    d.respostaEm ? `Respondido em ${formatDate(d.respostaEm.split('T')[0])}` : 'Ainda não respondida';

  openModal('modal-dnals-detail');
}

function salvarDenunciaAls() {
  const id = window._editDnAlsId;
  const d = (DB.denunciasAls||[]).find(x => x.id === id);
  if(!d) return;

  d.status = document.getElementById('dnals-detail-status-sel').value;
  d.resp = document.getElementById('dnals-detail-resp').value.trim();
  d.obs = document.getElementById('dnals-detail-obs').value.trim();

  const novaResposta = document.getElementById('dnals-detail-resposta').value.trim();
  if(novaResposta && !d.resposta) d.respostaEm = new Date().toISOString();
  if(!novaResposta) d.respostaEm = null;
  d.resposta = novaResposta;

  closeModal('modal-dnals-detail');
  renderDenunciasAls();
  saveLocalCache();
  sbSaveDenunciaAls(d).then(() => setSaveIndicator('☁️ Denúncia ALS salva na nuvem','var(--accent)'));
}

// Denúncias ALS não podem ser excluídas pelo app — é um canal de
// denúncia, o histórico precisa ficar preservado. Por isso não existe
// nenhuma função de exclusão aqui (ao contrário do Canal de Denúncia
// original, que permite excluir).

// ── QR Code do formulário público ──
function getAlsFormUrl() {
  const base = location.href.split('#')[0].split('?')[0].replace(/[^/]*$/, '');
  return base + 'denuncia-als-publica.html';
}

function openAlsQrModal() {
  const url = getAlsFormUrl();
  document.getElementById('als-qr-url').textContent = url;
  const target = document.getElementById('als-qr-target');
  target.innerHTML = '';
  new QRCode(target, { text: url, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.M });
  openModal('modal-als-qr');
}

function baixarQrAls() {
  const canvas = document.querySelector('#als-qr-target canvas');
  if(!canvas) return;
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'qrcode-canal-denuncia-als.png';
  a.click();
}
