-- create table notifications
-- (
--     id serial primary key,
--     user_rsid integer,
--     content varchar(100)
-- );

insert into notifications (user_id, content, is_new)
values($1, $2, $3);