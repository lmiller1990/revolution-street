-- Deploy revolution-street:2020_07_06_add_users to pg

BEGIN;

  create table users (
    id serial primary key,
    username text not null,
    email text not null
  );

COMMIT;
