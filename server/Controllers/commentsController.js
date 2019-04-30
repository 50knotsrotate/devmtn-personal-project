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

    db.add_comment([username, brewery_id, content, rating])
      .then(comments => {
        db.add_belch_points(username).then(ress => {
          db.create_notification([
            id,
            "You have earned a belch point for making a comment!",
            "true"
          ]).then(_ => {
            res.status(200).send(comments);
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
