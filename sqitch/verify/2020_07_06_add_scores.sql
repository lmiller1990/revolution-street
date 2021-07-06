-- Verify revolution-street:2020_07_06_add_scores on pg

BEGIN;

  select * from scores
  inner join "songs" on "songs"."id" = scores.song_id
  inner join "users" on "users"."id" = scores.user_id;


ROLLBACK;
