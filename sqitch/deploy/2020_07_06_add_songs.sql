-- Deploy revolution-street:2020_07_06_add_songs to pg

BEGIN;

  create table songs (
    id serial primary key,
    name text not null
  );

COMMIT;
