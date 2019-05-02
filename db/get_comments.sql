select u.username, c.rating, c.content
from comments c
    join users u on (u.id = c.user_id)
where c.brewery_id = $1;
