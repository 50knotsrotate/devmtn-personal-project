update users
set belch_points = belch_points + 1
where username = $1;
