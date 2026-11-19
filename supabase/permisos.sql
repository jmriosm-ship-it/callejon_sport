-- Permisos de acceso (hace falta en proyectos nuevos de Supabase).
-- Pégalo en SQL Editor → Run. Es seguro correrlo más de una vez.
grant usage on schema public to anon, authenticated;
grant select on settings, categories, products, product_sizes to anon, authenticated;
grant insert, update, delete on settings, categories, products, product_sizes to authenticated;
grant select on admins to authenticated;
grant execute on function is_admin() to anon, authenticated;
