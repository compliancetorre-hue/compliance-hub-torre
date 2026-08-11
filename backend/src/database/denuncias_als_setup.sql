-- ============================================================
-- CANAL DE DENÚNCIA ALS — tabela NOVA e SEPARADA da tabela
-- "denuncias" já existente. Nada aqui altera o canal atual.
--
-- Réplica das perguntas do formulário Microsoft Forms
-- "Canal de Denúncia – ALS." para permitir que as respostas
-- caiam direto no site, via formulário público (QR code) +
-- Edge Function "denuncia-als-publica" (ver
-- supabase/functions/denuncia-als-publica/index.ts).
-- A consulta pública de status/resposta usa a Edge Function
-- "denuncia-als-consulta" (ver
-- supabase/functions/denuncia-als-consulta/index.ts).
--
-- Execute este script no SQL Editor do Supabase.
-- ============================================================

CREATE TABLE IF NOT EXISTS denuncias_als (
  id SERIAL PRIMARY KEY,
  proto VARCHAR(20) UNIQUE NOT NULL,

  -- Identificação (tudo opcional — canal é anônimo por padrão)
  nome VARCHAR(150),
  telefone VARCHAR(30),
  email VARCHAR(150),

  -- Dados da denúncia (espelham o formulário ALS)
  setor VARCHAR(150),
  tipos TEXT[] NOT NULL,           -- checkboxes marcadas (Assédio moral, Fraude, etc.)
  tipo_outro VARCHAR(150),         -- texto livre do checkbox "Outra"
  descricao TEXT NOT NULL,         -- "Descrição do Fato"
  denunciado VARCHAR(150) NOT NULL,-- "Nome do Denunciado?"
  onde VARCHAR(200),
  quando DATE,
  horario VARCHAR(20),
  testemunhas TEXT,
  consentimento BOOLEAN NOT NULL DEFAULT false,

  -- Gestão interna (preenchido só pelo time de compliance)
  status VARCHAR(30) NOT NULL DEFAULT 'Aberta',
  resp VARCHAR(150),
  obs TEXT,                        -- observações internas — NUNCA exposto ao denunciante

  -- Resposta oficial ao denunciante — isto sim é exposto na consulta
  -- pública por protocolo (ver denuncia-als-consulta/index.ts). Prazo
  -- de resposta é sempre calculado como criado_em + 90 dias corridos,
  -- não é uma coluna (evita desatualização).
  resposta_denunciante TEXT,
  resposta_em TIMESTAMPTZ,

  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT als_status_valido CHECK (status IN ('Aberta','Em Análise','Encerrada','Arquivada'))
);

-- Caso a tabela já exista de uma execução anterior deste script
-- (antes do campo de resposta ao denunciante existir), adiciona as
-- colunas novas sem perder dados já gravados.
ALTER TABLE denuncias_als ADD COLUMN IF NOT EXISTS resposta_denunciante TEXT;
ALTER TABLE denuncias_als ADD COLUMN IF NOT EXISTS resposta_em TIMESTAMPTZ;

-- Mesmo padrão de trava usada nas outras tabelas (ver
-- supabase_rls_lockdown.sql): RLS ligado, ZERO policies para
-- anon/authenticated. Só a service_role (usada pelas Edge
-- Functions) consegue ler/gravar.
ALTER TABLE denuncias_als ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON denuncias_als FROM anon, authenticated;

-- Necessário para o SERIAL funcionar corretamente com REVOKE ALL:
-- a sequence também deve negar acesso direto a anon/authenticated.
REVOKE ALL ON SEQUENCE denuncias_als_id_seq FROM anon, authenticated;
