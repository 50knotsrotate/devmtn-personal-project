select users.username, comments.content, users.belch_points
from users
join comments on comments.brewery_id = $1;