-- Verify revolution-street:2020_08_23_add_image_to_scores on pg

BEGIN;

  select image from scores;

ROLLBACK;
