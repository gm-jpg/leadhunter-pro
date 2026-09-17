-- =========================================================================
-- ESQUEMA DO BANCO DE DADOS SUPABASE (PostgreSQL)
-- Copie e cole este script no SQL Editor do seu projeto Supabase
-- =========================================================================

-- Criação da tabela principal de leads e estabelecimentos comerciais
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  place_id text unique not null,
  name text not null,
  category text,
  address text,
  city text not null,
  state text not null,
  phone_raw text,
  whatsapp text,
  is_mobile boolean default false,
  google_maps_url text,
  website text,
  rating numeric(3, 2),
  user_ratings_total integer default 0,
  photos_count integer default 0,
  photos text[] default '{}',
  
  -- Triagem e Scoring de Oportunidades
  opportunity_score integer default 0, -- 0 a 100
  opportunity_factors text[] default '{}',
  
  -- Proposta e Materiais Criados pela IA
  developer_pitch jsonb,
  
  -- Funil de Vendas do Desenvolvedor
  status text default 'novo' check (status in ('novo', 'proposta_pronta', 'contatado', 'fechado', 'arquivado')),
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Índices para buscas rápidas
create index if not exists idx_leads_city on public.leads(city);
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_opportunity on public.leads(opportunity_score desc);
create index if not exists idx_leads_place_id on public.leads(place_id);

-- Ativar Row Level Security (RLS) para proteção dos seus dados
alter table public.leads enable row level security;

-- Política 1: Usuários anônimos podem ler dados APENAS para visualização da proposta pública (/proposta/[id])
create policy "Propostas públicas são visíveis para qualquer visitante"
  on public.leads
  for select
  using (true);

-- Política 2: Inserção e atualização permitidas para a aplicação
create policy "Permitir inserção e atualização de leads"
  on public.leads
  for all
  using (true)
  with check (true);

-- Trigger para atualizar automaticamente o campo updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists on_leads_updated on public.leads;
create trigger on_leads_updated
  before update on public.leads
  for each row
  execute function public.handle_updated_at();
