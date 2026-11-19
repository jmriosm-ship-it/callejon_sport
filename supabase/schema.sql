-- Callejón Store · base de datos para Supabase
-- Pégalo completo en Supabase → SQL Editor → Run.
-- Al final cambia TU_CORREO por el correo con el que vas a entrar al panel.

create table if not exists settings (
  id int primary key default 1 check (id = 1),
  whatsapp text not null default '',
  instagram text not null default '',
  address text not null default '',
  maps text not null default '',
  hours text[] not null default '{}',
  shipping text[] not null default '{}',
  payments text[] not null default '{}'
);
insert into settings (id) values (1) on conflict do nothing;

create table if not exists categories (
  id text primary key,
  name text not null,
  photo text not null default '',
  pos text not null default '50% 50%',
  sort int not null default 0,
  active boolean not null default true
);

create table if not exists products (
  id text primary key,
  name text not null,
  descr text not null default '',
  category_id text references categories(id),
  price int not null check (price >= 0),
  discount int not null default 0 check (discount between 0 and 95),
  tag text not null default '',
  photos text[] not null default '{}',
  sold_out boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists product_sizes (
  product_id text not null references products(id) on delete cascade,
  size text not null,
  stock int not null default 0 check (stock >= 0),
  sort int not null default 0,
  primary key (product_id, size)
);

-- Quién puede administrar
create table if not exists admins (email text primary key);

create or replace function is_admin() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from admins where email = (auth.jwt() ->> 'email'));
$$;

-- Seguridad: todos leen, solo los admins escriben
alter table settings enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_sizes enable row level security;
alter table admins enable row level security;

do $$
declare t text;
begin
  foreach t in array array['settings','categories','products','product_sizes'] loop
    execute format('drop policy if exists "leer %1$s" on %1$I', t);
    execute format('drop policy if exists "escribir %1$s" on %1$I', t);
    execute format('create policy "leer %1$s" on %1$I for select using (true)', t);
    execute format('create policy "escribir %1$s" on %1$I for all using (is_admin()) with check (is_admin())', t);
  end loop;
end $$;

drop policy if exists "admins se ven a si mismos" on admins;
create policy "admins se ven a si mismos" on admins for select using (email = (auth.jwt() ->> 'email'));

-- Fotos: carpeta pública "productos", solo los admins suben
insert into storage.buckets (id, name, public) values ('productos', 'productos', true) on conflict do nothing;
drop policy if exists "fotos publicas" on storage.objects;
drop policy if exists "fotos admin" on storage.objects;
create policy "fotos publicas" on storage.objects for select using (bucket_id = 'productos');
create policy "fotos admin" on storage.objects for all using (bucket_id = 'productos' and is_admin()) with check (bucket_id = 'productos' and is_admin());

-- ÚLTIMO PASO: tu correo de administrador (primero crea ese usuario en Authentication → Users)
insert into admins (email) values ('juanfelipegarciamenza0521@gmail.com') on conflict do nothing;
-- Permisos de acceso (hace falta en proyectos nuevos de Supabase).
-- Pégalo en SQL Editor → Run. Es seguro correrlo más de una vez.
grant usage on schema public to anon, authenticated;
grant select on settings, categories, products, product_sizes to anon, authenticated;
grant insert, update, delete on settings, categories, products, product_sizes to authenticated;
grant select on admins to authenticated;
grant execute on function is_admin() to anon, authenticated;
