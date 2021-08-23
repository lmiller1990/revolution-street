-- Revert revolution-street:2020_08_23_add_image_to_scores from pg

BEGIN;

  alter table scores 
  drop column image text;

COMMIT;
