-- Verify revolution-street:2020_07_09_add_grade_to_songs on pg

BEGIN;

  select grade from scores;

ROLLBACK;
