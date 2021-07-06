-- Verify revolution-street:2020_07_06_add_user_details on pg

BEGIN;

  select 
    region,
    twitter,
    last_active
  from users;

ROLLBACK;
