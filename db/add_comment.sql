update users
set belch_points = belch_points + 1
where username = $1;

insert into comments
    (user_id, brewery_id, content, rating)
values($1, $2, $3, $4)
returning *;