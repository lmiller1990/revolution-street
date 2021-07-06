-- Deploy revolution-street:2020_07_06_add_scores to pg

BEGIN;

  create table scores (
    id serial primary key,
    marvelous integer,
    perfect integer,
    great integer,
    good integer,
    miss integer,
    boo integer,
    song_id integer references songs(id),
    user_id integer references users(id)
  );

COMMIT;
