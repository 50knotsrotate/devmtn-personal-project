
insert into comments
    (user_id, brewery_id, content, rating, upvotes)
values($1, $2, $3, $4, 0)
returning *;