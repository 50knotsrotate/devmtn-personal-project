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
        console.log(err);
      });
  },
  editComment: (req, res) => { 
    console.log(req.body)
  },
  deleteComment: (req, res) => { 
    console.log(req.body)
  }

};
