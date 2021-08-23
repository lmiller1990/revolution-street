-- Deploy revolution-street:2020_08_23_add_image_to_scores to pg

BEGIN;

  alter table scores 
  add column image text;

COMMIT;
