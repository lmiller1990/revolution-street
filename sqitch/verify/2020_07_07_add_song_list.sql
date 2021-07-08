-- Verify revolution-street:2020_07_07_add_song_list on pg

BEGIN;

do $$
declare 
   song_count integer;
begin
   select count(*)
   into song_count
   from songs;
   
   assert song_count = 240, 'expected 240 songs!';
end$$;

ROLLBACK;
