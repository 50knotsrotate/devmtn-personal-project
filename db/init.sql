drop table if exists comments;
drop table if exists users;
drop table if exists notifications;


create table users(
    id serial primary key,
    username varchar(25),
    password varchar(250),
    premium_user text,
    belch_points integer
);

create table comments(
    id serial primary key,
    user_id varchar(20),
    brewery_id varchar(20),
    content text,
    rating integer,
    upvotes integer
);

create table notifications (
    id serial primary key, 
    user_id integer,
    content varchar(100),
    is_new varchar(5)
);

insert into users(username, password, premium_user, belch_points)
values('admin', 'admin', 'yes', 10000);

insert into comments(user_id, brewery_id, content, rating, upvotes)
values(1,'ZaaAPU', 'this plase rools', 5, 1),
(1,'ZaaAPU', 'this plase rox my six', 4, 1),
(1,'ZaaAPU', 'this plase is dowpe', 4, 1),
(1,'ZaaAPU', 'this plase rox my six', 4, 1),
(1,'ZaaAPU', 'their beer is litereally just seltzer with food coloring... 3 stars.', 3, 1),
(1,'ZaaAPU', 'BEER!!', 5, 1),
(1,'ZaaAPU', 'My girlfriend broke up with me 0 stars', 1, 0);
