-- Revert revolution-street:2020_07_07_add_song_list from pg

BEGIN;

  delete from songs;

COMMIT;
