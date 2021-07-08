-- Deploy revolution-street:2020_07_08_add_password_to_users to pg

BEGIN;

  alter table users
  add column password text not null;

COMMIT;
