-- Seed the cats table with default data.
-- Run from CLI: psql $DATABASE_URL -f scripts/seed-cats.sql
-- Or paste in Supabase SQL Editor.

delete from public.cats;

insert into public.cats (name, age, breed) values
  ('Whiskers', 2, 'Siamese'),
  ('Max', 3, 'Labrador - i would argue, if that''s a cat breed'),
  ('Bella', 4, 'Persian'),
  ('Milo', 4, 'Ragdoll'),
  ('Nala', 3, 'Bengal');
