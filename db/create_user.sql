insert into users
    (username, password, premium_user, belch_points, text_notifications, phone_number)
values($1, $2, 'no', 0, $3, $4)
returning *;