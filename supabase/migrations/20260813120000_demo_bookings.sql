-- Leads do formulário /agendar-demo (e checkout, se reativado).
--
-- Aplicar no projeto Supabase do site Grupo Granular (SQL Editor ou
-- `supabase db push`). Este ambiente não consegue aplicar sozinho:
-- o ref configurado em VITE_SUPABASE_URL não resolve DNS daqui.

create table if not exists public.demo_bookings (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),

  nome text not null,
  email text not null,
  whatsapp text not null,
  empresa text not null,
  segmento text not null,
  faturamento text,
  booked_date date,
  booked_time text,
  date_label text,
  time_label text,
  origem text not null default 'agendar-demo',
  status text not null default 'pendente'
    check (status in ('pendente', 'confirmada', 'cancelada')),

  user_agent text
);

comment on table public.demo_bookings is
  'Leads de demonstração enviados pelo site institucional (agendar-demo / checkout).';

alter table public.demo_bookings enable row level security;

-- Formulário público insere com a chave anônima. Sem SELECT para anon:
-- PII (e-mail/WhatsApp) não vaza no browser de outro visitante.
create policy "demo_bookings_publico_insert"
  on public.demo_bookings
  for insert
  to anon
  with check (true);

-- Horários ocupados, sem PII — o calendário do site marca slots já pegos.
create or replace function public.demo_slots_ocupados()
returns table (booked_date date, booked_time text)
language sql
stable
security definer
set search_path = public
as $$
  select d.booked_date, d.booked_time
  from public.demo_bookings d
  where d.status <> 'cancelada'
    and d.booked_date is not null
    and d.booked_time is not null
    and d.booked_time <> '-';
$$;

grant execute on function public.demo_slots_ocupados() to anon, authenticated;
