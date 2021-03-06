module.exports = {
  updateNotifications: (req, res) => {
    //This gets called when the notifications component unmounts. It takes all the new notifs and puts them into old.
    //TODO: intead of old notifications, which are dumb anyway, show all the users comments which will allow them to edit or delete their posts and just delete
    //the ones that have been read.
    const user = req.session.user;
    const db = req.app.get("db");
    const { id } = user;
    db.update_notifications(id).then(_ => {
      res.sendStatus(200);
    });
  },
  getNotifications: async (req, res) => {
    //This gets called when notifications component mounts
    //It gets all notifications associated with a user, where the old vs new notifications
    //are seperated on the front end. This feature is in the process of being removed

    const { user } = req.session;
    const { id } = user;
    const db = req.app.get("db");
    const notifications = await db.get_notifications(id);
    res.status(200).send(notifications);
  },
  addNotification: (req, res, next) => {
    const { user_id, username } = req.query; //this is the users id and username of the comment
    // const { id } = req.params //this is the reviews id, we dont need this here
    const db = req.app.get("db");
    const message = `${req.session.user.username} has upvoted your comment!`;
    db.create_notification([user_id, message, 1]).then(_ => {
      next();
    });
  }
};
