insert into users
    (username, password, premium_user, belch_points, text_notifications, phone_number)
values($1, $2, 0, 10, $3, $4)
returning *;