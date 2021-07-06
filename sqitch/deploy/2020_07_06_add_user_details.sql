-- Deploy revolution-street:2020_07_06_add_user_details to pg

BEGIN;

  alter table users 
  add column region text,
  add column twitter text,
  add column last_active timestamptz not null default now();


COMMIT;
