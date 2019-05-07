const client = require("../index");

module.exports = {
  getComments: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const comments = await db.get_comments([id]);
    res.status(200).send(comments);
  },
  addComment: async (req, res) => {
    const db = req.app.get("db");
    const user = req.session.user;
    const { username, id } = user;
    const { content, brewery_id, rating } = req.body;

    db.add_comment([id, brewery_id, content, rating])
      .then(comments => {
        db.add_belch_points(username).then(ress => {
          req.session.user.belch_points += 1; //Need to get rid of this. We have redux now.
          db.create_notification([
            id,
            "You have earned a belch point for making a comment!",
            1
          ]).then(_ => {
            db.get_comments(brewery_id).then(comments => {
              res.status(200).send(comments);
            });
          });
        });
      })
      .catch(err => {
        res.sendStatus(500)
      });
  },
  editComment: (req, res, next) => {
    //this handles upvotes
    const { id } = req.params; //this is the comment id
    const { brewery_id, user_id, username } = req.query;
    const db = req.app.get("db");

    db.add_upvote([id, brewery_id]).then(response => {
      db.find_user_by_id(user_id).then(user => {
        const foundUser = user[0];
        if (foundUser.id == req.session.user.id) {
          return res.status(500).send("You cannot upvote your own comment");
        } else {
          res.status(200).send(response);
        }

        if (foundUser.text_notifications) {
          client.client.messages
            .create({
              body: `${req.session.user.username} has upvoted your comment!`,
              from: "+12183668652",
              to: `+1${foundUser.phone_number}`
            })
            .then(message => {
              next();
            })
            .catch(err => {
              return res.status(500).send('Something went wrong :/')
            });
        }
      });
    });
  },
  deleteComment: (req, res) => {
    const { id } = req.params; //this is the id of the review being deleted
    const user_id = req.session.user.id;

    const db = req.app.get('db');
    db.remove_comment([id, user_id]).then(response => { 
      res.status(200).send(response)
    }).catch(err => { 
      res.sendStatus(500)
    })
  },
  getUserComments: (req, res) => {
    const db = req.app.get("db");
    db.get_user_comments(req.session.user.id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
