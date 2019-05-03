drop table if exists comments;
drop table if exists users;
drop table if exists notifications;
drop table if exists store;

create table store (
    id serial primary key,
    name text,
    description text,
    price integer,
    image text,
    handler text
);


create table users(
    id serial primary key,
    username varchar(25) not null,
    password varchar(250) not null,
    premium_user text,
    belch_points integer,
    text_notifications integer,
    phone_number text
);

create table comments(
    id serial primary key,
    user_id integer references users(id),
    brewery_id varchar(20),
    content text,
    rating integer,
    upvotes integer
);

create table notifications (
    id serial primary key, 
    user_id integer,
    content varchar(100),
    is_new integer
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

insert into store (name, description, price, image, handler)
values('Suddenly: Chuck', 'Blow up your friends (or foes) phones with Chuck Norris jokes. Issues 5 jokes.', 10, 'https:
//bloximages.chicago2.vip.townnews.com/starlocalmedia.com/content/tncms/assets/v3/editorial/7/ac/7acc5b1a-fa38-11e6-8b8d-17bb329f36ad/58af998ca4171.image.jpg', 'getChucked');