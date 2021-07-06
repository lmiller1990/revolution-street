-- Revert revolution-street:2020_07_06_add_users from pg

BEGIN;

  drop table users;

COMMIT;
