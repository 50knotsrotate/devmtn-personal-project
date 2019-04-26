insert into users
    (username, password, premium_user, belch_points)
values($1, $2, 'no', 0)
returning *;