-- Verify revolution-street:2020_07_06_add_songs on pg

BEGIN;

  select id, name from songs;

ROLLBACK;
