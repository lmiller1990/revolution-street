-- Revert revolution-street:2020_07_06_add_user_details from pg

BEGIN;

  alter table users 
  drop column region,
  drop column twitter,
  drop column last_active;

COMMIT;
