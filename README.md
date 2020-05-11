##Note:I took down www.belchpoint.com because it was too expensive to keep running. Server, domain,  and API costs made it worthwhile for me to take the site down and instead write a walk through. 

#### Belch point was an individually developed location based brewery discovery and review site. It was one of my code bootcamp projects. Users could find breweries near their location using the BreweryDB API. After logging in, the user was presented with a list of all the breweries nearby, and presented with the following: 

IMG HERE

#### When one of the brewery links were clicked, the user was presented with all the beers the brewery sold, along with a nice animated top-to-middle modal which had a description of each beer. This is also where the user would be able to write a review, which looked like this: 


img here

### To give a review, the user would hover the mouse over the circles until the appropriate number of glasses shows up, and clicking would set the rating in place, no longer responding to hovers until it was clicked again. On mobile, it would only respond to clicks. 


#### Whenever a user submitted a comment, they would earn one "belch point", an online "currency" for this site, which can be used to purchase things in the store, which we will look at in a bit. One other way a user could earn "belch points" is by getting their comments "upvoted" by other users. Each comment would keep track of how many upvotes it has gotten, and the comments are listed in order of how many belch points it has earned. This is done through the magic of SQL queries.. Specifically this one:
```sql
select u.username, c.rating, c.content, c.upvotes, c.user_id, c.id
from comments c
    join users u on (u.id = c.user_id)
where c.brewery_id = $1
order by c.upvotes desc;
```

#### After a user either makes a comment, or one of their comments were upvoted, they could see this in the "notifications" tab, which would bring you to this page: 

img here

#### The user does not have to manually delete notifications. They are deleted right after the user leaves the page, which was done with the help of the componentWillUnmount React lifecycle method. 

#### If the user signed up for text notifications, a text would have been sent to the user telling them that their comment was upvoted, and by who. This was done with Twilio. 

#### Finally, the user could take their "belch points" and buy things in the store, which had only one item. For 10 belch points, you could send 10 text messages at once, each one a different chuck norris joke, to any one phone number you wanted. This was also done with the help of Twilio & a chuck norris joke API. 

