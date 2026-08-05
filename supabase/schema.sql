-- Kjør dette i Supabase SQL editor (Project -> SQL Editor -> New query)

-- Bedrifter (én rad per registrert kunde, koblet 1:1 til auth.users)
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  website_url text,
  subscription_status text not null default 'inactive', -- 'inactive' | 'active' | 'past_due' | 'canceled'
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_ends_at timestamptz,
  created_at timestamptz not null default now(),
  unique (owner_id)
);

-- Kjør denne linjen separat hvis companies-tabellen allerede finnes fra før:
-- alter table public.companies add column if not exists trial_ends_at timestamptz;

-- Kunnskapsbase (én rad per bedrift, fritekstfelt for MVP)
create table if not exists public.knowledge_base (
  company_id uuid primary key references public.companies(id) on delete cascade,
  faq text not null default '',
  product_info text not null default '',
  return_policy text not null default '',
  shipping_policy text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.companies enable row level security;
alter table public.knowledge_base enable row level security;

-- En bruker kan kun se og endre sin egen bedrift
create policy "Eier kan se egen bedrift"
  on public.companies for select
  using (owner_id = auth.uid());

create policy "Eier kan opprette egen bedrift"
  on public.companies for insert
  with check (owner_id = auth.uid());

create policy "Eier kan oppdatere egen bedrift"
  on public.companies for update
  using (owner_id = auth.uid());

-- En bruker kan kun se og endre kunnskapsbasen til sin egen bedrift
create policy "Eier kan se egen kunnskapsbase"
  on public.knowledge_base for select
  using (
    company_id in (select id from public.companies where owner_id = auth.uid())
  );

create policy "Eier kan opprette egen kunnskapsbase"
  on public.knowledge_base for insert
  with check (
    company_id in (select id from public.companies where owner_id = auth.uid())
  );

create policy "Eier kan oppdatere egen kunnskapsbase"
  on public.knowledge_base for update
  using (
    company_id in (select id from public.companies where owner_id = auth.uid())
  );

-- Samtalehistorikk (én rad per kundehenvendelse + AI-svar).
-- session_id grupperer meldinger som hører til samme chat-økt hos kunden.
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  session_id uuid not null default gen_random_uuid(),
  customer_message text not null,
  ai_response text not null,
  escalated boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists conversations_company_id_idx
  on public.conversations (company_id, created_at desc);

create index if not exists conversations_session_id_idx
  on public.conversations (company_id, session_id, created_at);

alter table public.conversations enable row level security;

-- En bruker kan kun se samtalene til sin egen bedrift
create policy "Eier kan se egne samtaler"
  on public.conversations for select
  using (
    company_id in (select id from public.companies where owner_id = auth.uid())
  );
