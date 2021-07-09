-- Deploy revolution-street:2020_07_09_add_grade_to_songs to pg

BEGIN;

  alter table scores 
  add column grade text not null;

COMMIT;
