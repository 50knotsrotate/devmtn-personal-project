
insert into comments
    (user_id, brewery_id, content, rating)
values($1, $2, $3, $4)
returning *;