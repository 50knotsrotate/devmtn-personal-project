delete from comments
where id = $1;


select *
from comments
where user_id = $2;