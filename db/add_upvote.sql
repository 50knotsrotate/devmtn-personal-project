update comments
set upvotes = upvotes + 1
where comments.id = $1;


select u.username, c.rating, c.content, c.upvotes, c.user_id, c.id
from comments c
    join users u on (u.id = c.user_id)
where c.id = $1;