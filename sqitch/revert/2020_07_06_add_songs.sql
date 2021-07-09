-- Revert revolution-street:2020_07_06_add_songs from pg

BEGIN;

  delete from songs;
  drop table songs;

COMMIT;
