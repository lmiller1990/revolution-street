-- Revert revolution-street:2020_07_06_add_scores from pg

BEGIN;

  drop table scores;

COMMIT;
