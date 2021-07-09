-- Revert revolution-street:2020_07_09_add_grade_to_songs from pg

BEGIN;

  alter table scores 
  drop column grade;

COMMIT;
