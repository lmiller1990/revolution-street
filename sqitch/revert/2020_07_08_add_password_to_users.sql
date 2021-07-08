-- Revert revolution-street:2020_07_08_add_password_to_users from pg

BEGIN;

  alter table users
  drop column password;

COMMIT;
