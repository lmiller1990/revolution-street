-- Deploy revolution-street:2020_07_06_add_songs to pg

BEGIN;

  create table songs (
    id integer not null unique,
    name text not null
  );

COMMIT;
