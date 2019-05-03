update users
set belch_points = belch_points - $2
where username = $1
returning * ;