drop table if exists comments;
drop table if exists users;


create table users(
    id serial primary key,
    username varchar(25),
    password varchar(250),
    premium_user text,
    belch_points integer
);

create table comments(
    id serial primary key,
    user_id integer,
    brewery_id varchar(20),
    content text
);

insert into users(username, password, premium_user, belch_points)
values('admin', 'admin', 'yes', 10000);

insert into comments(
    user_id,
    brewery_id,
    content
)
values(2, 'ZaaAPU', 'This place has the weirdest tasting soda...');