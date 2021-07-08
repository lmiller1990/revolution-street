-- Verify revolution-street:2020_07_08_add_password_to_users on pg

BEGIN;

  select password from users;

ROLLBACK;
