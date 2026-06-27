-- Esquema de Supabase para "Quédate conmigo"
-- Ejecutar en el SQL Editor de Supabase (Project > SQL Editor > New query).

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  address text not null,
  address_extra text,
  postal_code text not null,
  city text not null,
  province text not null,
  country text not null default 'España',
  payment_method text not null check (payment_method in ('bizum', 'wallapop')),
  book_price numeric(10, 2),
  shipping_price numeric(10, 2) default 0.75,
  total_price numeric(10, 2),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled'))
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_email_idx on public.orders (email);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null unique
);

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

-- RLS: las tablas solo se escriben/leen desde el servidor con la service role key,
-- nunca desde el navegador. Se activa RLS sin policies para bloquear el acceso público
-- (anon/authenticated) por completo; la service role key siempre la salta.
alter table public.orders enable row level security;
alter table public.newsletter_subscribers enable row level security;
