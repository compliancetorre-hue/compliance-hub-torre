// ══════════════════════════════════════════
// SUPABASE CONFIG — preencha com suas credenciais
// ══════════════════════════════════════════
// ⚠️  SUBSTITUA os valores abaixo pelos do seu projeto Supabase
// Pegue em: https://app.supabase.com → Settings → API

// ✅ URL do projeto (correta)
  // ← JÁ DEFINIDA NO INÍCIO

// ⚠️  COLE AQUI sua anon key (começa com eyJ...)
// Pegue em: supabase.com → seu projeto → Settings → API → "anon public"
// Chave anon não é mais usada diretamente — todo acesso vai pelo Edge Function
// Anon key — injetada pelo CI/CD via GitHub Secrets
const SUPABASE_ANON = '%%SUPABASE_ANON_KEY%%';

// Ativo quando a anon key parece uma JWT válida (começa com eyJ)
// Também verifica se há uma chave salva no localStorage
// ── EDGE FUNCTION — único ponto de acesso ao banco (service_role fica no servidor)
// const EDGE_URL = SUPABASE_URL + '/functions/v1/api';  // ← JÁ DEFINIDA NO INÍCIO

function getAppToken() { return sessionStorage.getItem('ch_app_token') || ''; }
function setAppToken(t) { sessionStorage.setItem('ch_app_token', t); }

// Mantido por compatibilidade (não expõe chave ao cliente)
function getActiveKey() { return localStorage.getItem('sb_anon_key_override') || SUPABASE_ANON || ''; }
function getSbHeaders(extra) { return Object.assign({'Content-Type':'application/json','x-app-token':getAppToken()}, extra||{}); }
const SB_HEADERS = new Proxy({}, { get(_, prop) { return getSbHeaders()[prop]; } });

const USE_SUPABASE = SUPABASE_URL.includes('supabase.co');

function _efH() {
  const k=getActiveKey(); return { 'Content-Type': 'application/json', 'x-app-token': getAppToken(), ...(k?{'apikey':k,'Authorization':'Bearer '+k}:{}) };
}

// ── API helpers — todas as chamadas passam pelo Edge Function
async function sbGet(table, params='') {
  const qs = params ? '&' + params : '';
  const token = getAppToken();
  // Try Edge Function first if token available
  if(token) {
    try {
      const r = await fetch(`${EDGE_URL}/data/${table}?order=id${qs}`, { headers: _efH() });
      if(r.ok) return r.json();
      if(r.status !== 401) {
        const txt = await r.text().catch(()=>'');
        throw new Error(`${table}: HTTP ${r.status} ${txt.slice(0,100)}`);
      }
      console.warn('[sbGet] Edge 401, tentando REST direto...');
    } catch(e) {
      if(!e.message.includes('401')) throw e;
    }
  }
  // Fallback: direct Supabase REST with anon key
  const r2 = await fetch(`${SUPABASE_URL}/rest/v1/${table}?order=id&limit=10000${qs ? '&'+qs : ''}`, {
    headers: { 'Content-Type':'application/json', 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer '+SUPABASE_ANON }
  });
  if(!r2.ok) {
    const txt = await r2.text().catch(()=>'');
    throw new Error(`${table}: HTTP ${r2.status} ${txt.slice(0,100)}`);
  }
  return r2.json();
}
async function sbInsert(table, body) { return sbUpsert(table, body); }
async function sbUpdate(table, id, body) { return sbUpsert(table, { id, ...body }); }
async function sbUpsert(table, body, _c='id') {
  const token = getAppToken();
  if(token) {
    try {
      const r = await fetch(`${EDGE_URL}/data/${table}`,
        { method:'POST', headers: _efH(), body: JSON.stringify(body) });
      if(r.ok) return r.json();
      if(r.status !== 401) {
        const txt = await r.text().catch(()=>'');
        throw new Error(`${table}: HTTP ${r.status} ${txt.slice(0,100)}`);
      }
    } catch(e) { if(!e.message.includes('HTTP 4')) throw e; }
  }
  // Fallback: direct REST
  const r2 = await fetch(`${SUPABASE_URL}/rest/v1/${table}`,
    { method:'POST', headers: { 'Content-Type':'application/json', 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer '+SUPABASE_ANON, 'Prefer': 'resolution=merge-duplicates,return=representation' }, body: JSON.stringify(body) });
  if(!r2.ok) { const txt = await r2.text().catch(()=>''); throw new Error(`${table}: ${r2.status} ${txt.slice(0,80)}`); }
  return r2.json();
}
async function sbDelete(table, id) {
  // Try Edge Function first
  const token = getAppToken();
  if(token) {
    try {
      const r = await fetch(`${EDGE_URL}/data/${table}?id=${id}`,
        { method:'DELETE', headers: _efH() });
      if(r.ok) return;
    } catch(e) { console.warn('sbDelete Edge falhou, usando REST:', e.message); }
  }
  // Fallback: REST direto
  const r2 = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,
    { method:'DELETE', headers: {'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON} });
  if(!r2.ok) throw new Error(`sbDelete ${table}: ${r2.status}`);
}
async function sbDeleteProto(proto) {
  const token = getAppToken();
  if(token) {
    try {
      const r = await fetch(`${EDGE_URL}/data/denuncias?proto=${encodeURIComponent(proto)}`,
        { method:'DELETE', headers: _efH() });
      if(r.ok) return;
    } catch(e) { console.warn('sbDeleteProto Edge falhou:', e.message); }
  }
  const r2 = await fetch(`${SUPABASE_URL}/rest/v1/denuncias?proto=eq.${encodeURIComponent(proto)}`,
    { method:'DELETE', headers: {'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON} });
  if(!r2.ok) throw new Error(`sbDeleteProto: ${r2.status}`);
}

// ── Map DB.denuncias item → Supabase row
function dnToRow(d) {
  return {
    id: d.id, proto: d.proto, cat: d.cat, filial: d.filial, setor: d.setor||'',
    data: d.data||null, anon: d.anon, perigo: d.perigo, status: d.status,
    resp: d.resp||'', relato: d.relato||'', acao_inicial: d.acaoInicial||'', obs: d.obs||'',
    conclusao: d.conclusao||'',
    denunciante_nome: d.nome||'', denunciante_tel: d.tel||'', denunciante_email: d.email||''
  };
}
function rowToDn(r) {
  let dataStr = r.data||'';
  if(dataStr && dataStr.includes('T')) dataStr = dataStr.split('T')[0];
  return {
    id: r.id, proto: r.proto, cat: r.cat, filial: r.filial, setor: r.setor||'',
    data: dataStr, anon: r.anon, perigo: r.perigo, status: r.status,
    resp: r.resp||'', relato: r.relato||'', acaoInicial: r.acao_inicial||'', obs: r.obs||'',
    conclusao: r.conclusao||'',
    nome: r.denunciante_nome||'', tel: r.denunciante_tel||'', email: r.denunciante_email||''
  };
}

// ── Load ALL data from Supabase into DB
async function loadFromSupabase() {
  try {
    showLoadingBar(true, 'Conectando ao Supabase...');

    // Uma única chamada carrega tudo — economiza créditos Netlify/Supabase
    const allData = await (async () => {
      const token = getAppToken();
      if(token) {
        try {
          const r = await fetch(`${EDGE_URL}/load-all`, { headers: _efH() });
          if(r.ok) {
            const d = await r.json();
            return {
              filiais: d.filiais||[], riscos: d.riscos||[], controles: d.controles||[],
              planos: d.planos||[], denRows: d.denuncias||[], fbRows: d.fbboards||[],
              rmPlanos: d.rmPlanos||[], agenda: d.agenda||[], settings: d.settings||[]
            };
          }
        } catch(e) { console.warn('load-all falhou, usando REST direto:', e.message); }
      }
      // Fallback: REST direto com anon key
      const [f,r,c,p,dn,fb,ag1,ag2,st] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/filiais?order=id&limit=10000`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
        fetch(`${SUPABASE_URL}/rest/v1/riscos?order=id&limit=10000`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
        fetch(`${SUPABASE_URL}/rest/v1/controles?order=id&limit=10000`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
        fetch(`${SUPABASE_URL}/rest/v1/planos?order=id&limit=10000`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
        fetch(`${SUPABASE_URL}/rest/v1/denuncias?order=id&limit=10000`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
        fetch(`${SUPABASE_URL}/rest/v1/fbboards?id=eq.main`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
        fetch(`${SUPABASE_URL}/rest/v1/agenda?order=data&limit=10000`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
        fetch(`${SUPABASE_URL}/rest/v1/rm_planos?order=id&limit=10000`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
        fetch(`${SUPABASE_URL}/rest/v1/settings?select=*`, {headers:{'apikey':SUPABASE_ANON,'Authorization':'Bearer '+SUPABASE_ANON}}).then(x=>x.json()),
      ]);
      return { filiais:f||[], riscos:r||[], controles:c||[], planos:p||[], denRows:dn||[], fbRows:fb||[], rmPlanos:ag2||[], agenda:ag1||[], settings:st||[] };
    })();
    const { filiais, riscos, controles, planos, denRows, fbRows } = allData;
    // Restore extra data from load-all
    if(allData.rmPlanos?.length > 0) DB.rmPlanos = allData.rmPlanos.map(p=>({id:p.id,riscoId:p.risco_id,titulo:p.titulo,resp:p.resp||'',prazo:p.prazo||'',tipo:p.tipo||'Preventiva',status:p.status||'Não Iniciado',prog:p.prog||0,andamento:p.andamento||''}));
    if(allData.agenda?.length > 0) DB.agenda = allData.agenda.map(e=>({id:e.id,titulo:e.titulo,tipo:e.tipo||'Outro',data:e.data,hora:e.hora||'',horaFim:e.hora_fim||'',local:e.local||'',resp:e.resp||'',desc:e.descricao||'',lembrete:e.lembrete||'',recorrencia:e.recorrencia||'nenhuma'}));
    if(allData.settings?.length > 0) { const units = allData.settings.find(s=>s.key==='rm_units'); if(units?.value) { try { const su=JSON.parse(units.value); if(Array.isArray(su)) su.forEach(u=>{ if(u.id&&!RM_UNITS.some(x=>x.id===u.id)) RM_UNITS.push(u); }); } catch(e){} } }

    // ── FILIAIS: Supabase é a fonte de verdade se tiver dados, senão mantém built-in
    if(filiais.length > 0) {
      DB.filiais = filiais.map(f => ({
        id:f.id, nome:f.nome, cnpj:f.cnpj||'', cidade:f.cidade||'',
        resp:f.resp||'', setor:f.setor||'', setores:f.setores||''
      }));
    }

    // ── RISCOS: merge Supabase + built-in
    // ── RISCOS: Supabase é a única fonte de verdade
    if(riscos.length > 0) {
      DB.riscos = riscos.map(r => ({
        id:r.id, desc:r.descricao||r.desc||'', cat:r.cat||'', filial:r.filial||'Todas',
        setor:r.setor||'', unidade:r.unidade||'Geral',
        prob:r.prob||10, impacto:r.impacto||10, controle:r.controle||'', obs:r.obs||''
      }));
    }

    // ── CONTROLES
    if(controles.length > 0) {
      DB.controles = controles.map(c => ({
        id:c.id, nome:c.nome, tipo:c.tipo, filial:c.filial, setor:c.setor,
        resp:c.resp||'', period:c.period, prazo:c.prazo||'',
        status:c.status, prog:c.prog||0, desc:c.descricao||''
      }));
    }

    // ── PLANOS
    if(planos.length > 0) {
      DB.planos = planos.map(p => ({
        id:p.id, titulo:p.titulo, origem:p.origem||'', filial:p.filial, setor:p.setor,
        resp:p.resp||'', prazo:p.prazo||'', prio:p.prio, status:p.status,
        prog:p.prog||0, desc:p.descricao||''
      }));
    }

    // ── DENÚNCIAS: Supabase é a única fonte de verdade
    if(denRows.length > 0) {
      DB.denuncias = denRows.map(rowToDn);
    }

    // ── FLOWBOARD
    if(fbRows && fbRows[0] && fbRows[0].data) {
      const saved = fbRows[0].data;
      if(Object.keys(saved).length > 0) DB.fbBoards = saved;
    }

    // rm_planos, agenda e settings já carregados no load-all acima

    // ── Atualizar _ids com o máximo de todos os dados
    const maxId = arr => arr && arr.length ? Math.max(...arr.map(x=>x.id||0)) + 1 : 1;
    DB._ids.filial  = Math.max(DB._ids.filial||1,  maxId(DB.filiais));
    DB._ids.risco   = Math.max(DB._ids.risco||20,  maxId(DB.riscos));
    DB._ids.rmPlano = Math.max(DB._ids.rmPlano||17, maxId(DB.rmPlanos));
    DB._ids.ctrl    = Math.max(DB._ids.ctrl||1,    maxId(DB.controles));
    DB._ids.plano   = Math.max(DB._ids.plano||1,   maxId(DB.planos));
    DB._ids.dn      = Math.max(DB._ids.dn||1,      maxId(DB.denuncias));
    DB._ids.agenda  = Math.max(DB._ids.agenda||1,  maxId(DB.agenda));

    saveLocalCache();
    showLoadingBar(false);
    setSaveIndicator('☁️ Sincronizado', 'var(--accent)');
    console.log(`[ComplianceHub] Supabase OK: ${DB.riscos.length} riscos, ${DB.denuncias.length} denúncias, ${DB.filiais.length} filiais`);
    return true;
  } catch(e) {
    showLoadingBar(false);
    console.warn('[ComplianceHub] Supabase erro:', e.message);

    if(e.message && (e.message.includes('Failed to fetch') || e.message.includes('NetworkError'))) {
      setSaveIndicator('⚠️ Sem internet (cache local)', 'var(--warn)');
      return false;
    }
    if(e.message && e.message.includes('não existe')) {
      setSaveIndicator('❌ Tabelas não criadas', 'var(--danger)');
      setTimeout(() => alert('❌ ' + e.message + '\n\nExecute o arquivo supabase_COMPLETO.sql no SQL Editor do Supabase.'), 300);
      return false;
    }
    if(e.message && e.message.includes('sem permissão')) {
      setSaveIndicator('❌ Permissão negada', 'var(--danger)');
      setTimeout(() => alert('❌ ' + e.message + '\n\nExecute o arquivo supabase_LIBERAR_SCHEMA.sql no SQL Editor do Supabase.'), 300);
      return false;
    }
    setSaveIndicator('❌ ' + e.message.slice(0,50), 'var(--danger)');
    console.warn('[ComplianceHub] Erro Supabase:', e.message);
    return false;
  }
}

// ── Save single item to Supabase
async function sbSaveDenuncia(d) {
  if(!USE_SUPABASE) return;
  try {
    await sbUpsert('denuncias', dnToRow(d));
    auditLog('update','denuncias', `Denúncia ${d.proto||d.id} — status: ${d.status||''}`, {proto:d.proto, status:d.status});
  } catch(e) { console.warn('sbSaveDenuncia:', e.message); }
}
async function sbSaveAgenda(e) {
  if(!USE_SUPABASE) return;
  const row = {
    id:e.id, titulo:e.titulo, tipo:e.tipo||'Outro',
    data:e.data, hora:e.hora||'', hora_fim:e.horaFim||'',
    local:e.local||'', resp:e.resp||'', descricao:e.desc||'',
    lembrete:e.lembrete||'', recorrencia:e.recorrencia||'nenhuma'
  };
  try { await sbUpsert('agenda', row); auditLog('update','agenda',`Evento "${e.titulo}" salvo`,{data:e.data,tipo:e.tipo}); }
  catch(e2) { console.warn('sbSaveAgenda:', e2.message); }
}
async function sbDeleteAgenda(id) {
  if(!USE_SUPABASE) return;
  try { await sbDelete('agenda', id); auditLog('delete','agenda',`Evento ID ${id} excluído`,{id}); }
  catch(e) { console.warn('sbDeleteAgenda:', e.message); }
}
async function sbDeleteDenuncia(id) {
  if(!USE_SUPABASE) return;
  try {
    await sbDelete('denuncias', id);
    auditLog('delete','denuncias', `Denúncia ID ${id} excluída`, {id});
  } catch(e) { console.warn('sbDeleteDenuncia:', e.message); }
}
async function sbSaveFilial(f) {
  if(!USE_SUPABASE) return;
  const row = { id:f.id, nome:f.nome, cnpj:f.cnpj||'', cidade:f.cidade||'', resp:f.resp||'', setor:f.setor||'', setores:f.setores||'' };
  try { await sbUpsert('filiais', row); auditLog('update','filiais',`Filial "${f.nome}" salva`,{nome:f.nome}); }
  catch(e) { console.warn('sbSaveFilial:', e.message); }
}
async function sbDeleteFilial(id) {
  if(!USE_SUPABASE) return;
  try { await sbDelete('filiais', id); auditLog('delete','filiais',`Filial ID ${id} excluída`,{id}); }
  catch(e) { console.warn('sbDeleteFilial:', e.message); }
}
async function sbSaveRisco(r) {
  if(!USE_SUPABASE) return;
  const row = { id:r.id, descricao:r.desc, cat:r.cat, filial:r.filial||'Todas', setor:r.setor, unidade:r.unidade||'Geral', prob:r.prob, impacto:r.impacto, controle:r.controle||'', obs:r.obs||'' };
  try { await sbUpsert('riscos', row); auditLog('update','riscos',`Risco "${r.desc?.substring(0,40)}" salvo — ${r.unidade||''}`,{unidade:r.unidade}); }
  catch(e) { console.warn('sbSaveRisco:', e.message); }
}
async function sbDeleteRisco(id) {
  if(!USE_SUPABASE) return;
  try { await sbDelete('riscos', id); auditLog('delete','riscos',`Risco ID ${id} excluído`,{id}); }
  catch(e) { console.warn('sbDeleteRisco:', e.message); }
}
async function sbSaveRmPlano(p) {
  if(!USE_SUPABASE) return;
  // rmPlanos table: id, risco_id, titulo, resp, prazo, tipo, status, prog, andamento
  const row = { id:p.id, risco_id:p.riscoId, titulo:p.titulo, resp:p.resp||'', prazo:p.prazo||null, tipo:p.tipo||'Preventiva', status:p.status||'Não Iniciado', prog:p.prog||0, andamento:p.andamento||'' };
  try { await sbUpsert('rm_planos', row); auditLog('update','rm_planos',`Plano RM "${p.titulo}" salvo`,{titulo:p.titulo,status:p.status}); }
  catch(e) { console.warn('sbSaveRmPlano:', e.message); }
}
async function sbDeleteRmPlano(id) {
  if(!USE_SUPABASE) return;
  try { await sbDelete('rm_planos', id); auditLog('delete','rm_planos',`Plano RM ID ${id} excluído`,{id}); }
  catch(e) { console.warn('sbDeleteRmPlano:', e.message); }
}
async function sbSaveRmUnit(units) {
  if(!USE_SUPABASE) return;
  // Store custom units as JSON in a settings table
  try { await sbUpsert('settings', { key:'rm_units', value: JSON.stringify(units) }); }
  catch(e) { console.warn('sbSaveRmUnit:', e.message); }
}
async function sbSaveControle(c) {
  if(!USE_SUPABASE) return;
  const row = { id:c.id, nome:c.nome, tipo:c.tipo, filial:c.filial, setor:c.setor, resp:c.resp||'', period:c.period, prazo:c.prazo||null, status:c.status, prog:c.prog||0, descricao:c.desc||'' };
  try { await sbUpsert('controles', row); auditLog('update','controles',`Controle "${c.nome}" salvo`,{nome:c.nome,status:c.status}); }
  catch(e) { console.warn('sbSaveControle:', e.message); }
}
async function sbDeleteControle(id) {
  if(!USE_SUPABASE) return;
  try { await sbDelete('controles', id); auditLog('delete','controles',`Controle ID ${id} excluído`,{id}); }
  catch(e) { console.warn('sbDeleteControle:', e.message); }
}
async function sbSavePlano(p) {
  if(!USE_SUPABASE) return;
  const row = { id:p.id, titulo:p.titulo, origem:p.origem||'', filial:p.filial, setor:p.setor, resp:p.resp||'', prazo:p.prazo||null, prio:p.prio, status:p.status, prog:p.prog||0, descricao:p.desc||'' };
  try { await sbUpsert('planos', row); auditLog('update','planos',`Plano "${p.titulo}" salvo`,{titulo:p.titulo,status:p.status}); }
  catch(e) { console.warn('sbSavePlano:', e.message); }
}
async function sbDeletePlano(id) {
  if(!USE_SUPABASE) return;
  try { await sbDelete('planos', id); auditLog('delete','planos',`Plano ID ${id} excluído`,{id}); }
  catch(e) { console.warn('sbDeletePlano:', e.message); }
}
async function sbSaveFbBoards() {
  if(!USE_SUPABASE) return;
  try { await sbUpsert('fbboards', { id:'main', data: DB.fbBoards, updated_at: new Date().toISOString() }); }
  catch(e) { console.warn('sbSaveFbBoards:', e.message); }
}

// ── Bulk import denuncias to Supabase
async function sbBulkImportDenuncias(rows) {
  if(!USE_SUPABASE || rows.length === 0) return;
  let success = 0, failed = 0;
  try {
    // Send in batches of 50
    for(let i = 0; i < rows.length; i += 50) {
      const batch = rows.slice(i, i+50).map(dnToRow);
      showLoadingBar(true, `Enviando ao Supabase... ${Math.min(i+50, rows.length)}/${rows.length}`);
      try {
        await sbUpsert('denuncias', batch);
        success += batch.length;
      } catch(batchErr) {
        console.warn('Batch falhou, tentando individualmente:', batchErr.message);
        // Retry individually to isolate bad rows
        for(const row of batch) {
          try {
            await sbUpsert('denuncias', row);
            success++;
          } catch(rowErr) {
            console.warn('Linha falhou id=' + row.id + ':', rowErr.message);
            failed++;
          }
        }
      }
    }
    showLoadingBar(false);
    if(failed > 0) {
      setSaveIndicator(`⚠️ ${success} salvas, ${failed} com erro`, 'var(--warn)');
    } else {
      auditLog('import', 'denuncias', `Planilha importada — ${success} denúncias`, {total:success, erros:failed});
    setSaveIndicator(`☁️ ${success} denúncias salvas na nuvem`, 'var(--accent)');
    }
  } catch(e) {
    console.warn('sbBulkImport erro geral:', e.message);
    showLoadingBar(false);
    setSaveIndicator('❌ Erro ao salvar na nuvem: ' + e.message.slice(0,60), 'var(--danger)');
  }
}

// ══════════════════════════════════════════
// CACHE LOCAL (fallback offline)
// ══════════════════════════════════════════
const DB_KEY = 'compliance_hub_db_v5';
function saveLocalCache() {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify({
      filiais:DB.filiais, riscos:DB.riscos, rmPlanos:DB.rmPlanos||[],
      rmUnits:RM_UNITS,
      controles:DB.controles, planos:DB.planos, denuncias:DB.denuncias,
      fbBoards:DB.fbBoards, agenda:DB.agenda||[], _ids:DB._ids, _savedAt:new Date().toISOString()
    }));
  } catch(e) { console.warn('saveLocalCache:', e); }
}
function loadLocalCache() {
  try {
    // Limpar chaves antigas
    ['v1','v2','v3','v4'].forEach(v => { try { localStorage.removeItem('compliance_hub_db_'+v); } catch(e){} });
    const raw = localStorage.getItem(DB_KEY);
    if(!raw) return false;
    const s = JSON.parse(raw);
    if(!s) return false;
    // Filiais: cache só vence se tiver mais que o built-in (16)
    // Supabase é a fonte de verdade — cache local é só fallback offline
    if(s.filiais && s.filiais.length > 0) DB.filiais = s.filiais;
    if(s.riscos && s.riscos.length > 0) DB.riscos = s.riscos;
    if(s.rmPlanos && s.rmPlanos.length > 0) DB.rmPlanos = s.rmPlanos;
    if(s.controles && s.controles.length > 0) DB.controles = s.controles;
    if(s.planos && s.planos.length > 0) DB.planos = s.planos;
    if(s.denuncias && s.denuncias.length > 0) DB.denuncias = s.denuncias;
    if(s.fbBoards) DB.fbBoards = s.fbBoards;
    if(s.agenda && s.agenda.length > 0) DB.agenda = s.agenda;
    if(s._ids) Object.keys(s._ids).forEach(k => { if((s._ids[k]||0) > (DB._ids[k]||0)) DB._ids[k] = s._ids[k]; });
    // Restore custom units (keep built-in + add user-created ones)
    if(s.rmUnits && Array.isArray(s.rmUnits)) {
      s.rmUnits.forEach(u => {
        if(u.id && !RM_UNITS.some(x=>x.id===u.id)) {
          RM_UNITS.push(u);
        }
      });
    }
    return true;
  } catch(e) { return false; }
}
function forceResetCache() {
  if(!confirm('Limpar cache e recarregar dados originais?\nSuas denúncias serão mantidas.')) return;
  try {
    const dn = JSON.stringify(DB.denuncias);
    ['v1','v2','v3','v4','v5'].forEach(v => { try { localStorage.removeItem('compliance_hub_db_'+v); } catch(e){} });
    try { localStorage.clear(); } catch(e) {}
    try { DB.denuncias = JSON.parse(dn); saveLocalCache(); } catch(e) {}
  } catch(e) {}
  location.reload();
}
function clearLocalCache() { localStorage.removeItem(DB_KEY); }
