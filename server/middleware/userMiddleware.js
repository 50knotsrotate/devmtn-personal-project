module.exports = {
  checkBelchPoints: (req, res, next) => {
    const db = req.app.get("db");
    const { points } = req.body;

    const { belch_points } = req.session.user;
    if (belch_points < points) {
      res.status(500).send("You dont have enough belch points for that");
    } else {
      next();
    }
  },
  premiumUsersOnly: (req, res, next) => {
    console.log(req.session.user)
    if (req.session.user.is_premium_user) {
      next();
    } else {
      res.status(500).send("You must be a premium user to do that.");
    }
    },
    deductBelch: (req, res) => { 
        const db = req.app.get('db');
        const { points } = req.body
        const { username } = req.session.user
        db.remove_belch([username, points]).then(response => { 
           req.session.user.belch_points -= points
        })
    }
};