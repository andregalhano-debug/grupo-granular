-- Registro de aceite dos Termos de Uso / Política de Privacidade por parceiros
-- em fase de teste, antes de iniciar a utilização da plataforma Granular.
--
-- Esta migration precisa ser aplicada manualmente no projeto Supabase da Granular
-- (SQL Editor do dashboard, ou `supabase db push` com o projeto linkado) — este
-- ambiente não tem credenciais para rodá-la diretamente.

create table if not exists public.termos_aceites (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),

  empresa_nome text not null,
  cnpj text not null,
  representante_nome text not null,
  representante_cpf text not null,
  email text not null,
  whatsapp text not null,

  -- qual oferta está sendo contratada — os Termos tratam cada uma com regras
  -- próprias (Seção 2 Sistema, Seção 3 Mentorados/Especialista)
  tipo_contratacao text not null check (tipo_contratacao in ('sistema', 'especialista', 'mentoria')),

  -- qual versão dos documentos foi aceita, para valer como prova (Termos §2.6 / LGPD)
  termos_versao text not null,
  privacidade_versao text not null,

  -- de onde veio o convite (?ref= na URL), para saber qual parceiro abriu o link
  parceiro_ref text,

  -- capturado a partir do header da própria requisição pelo PostgREST — o
  -- front-end nunca envia este campo, então não dá para forjar o IP no insert
  ip_address text default nullif(current_setting('request.header.x-forwarded-for', true), ''),
  user_agent text
);

comment on table public.termos_aceites is
  'Prova de aceite dos Termos de Uso e Política de Privacidade por empresas parceiras convidadas a testar a plataforma.';

alter table public.termos_aceites enable row level security;

-- O formulário público (/aceite) insere com a chave anônima. Ninguém além do
-- dashboard/service role consegue ler os registros (sem policy de select para anon).
create policy "aceite_publico_insert"
  on public.termos_aceites
  for insert
  to anon
  with check (true);
