select u.username, c.rating, c.content, c.upvotes, c.user_id, c.id
from comments c
    join users u on (u.id = c.user_id)
where c.brewery_id = $1
order by c.upvotes desc;
