-- Verify revolution-street:2020_07_06_add_users on pg

BEGIN;

  select id, email, username from users;

ROLLBACK;
