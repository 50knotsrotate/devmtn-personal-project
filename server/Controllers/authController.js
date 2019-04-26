const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  sign_up: (req, res) => {
    const { password, username } = req.body;
    const db = req.app.get("db");
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = await db.find_user(username);
        if (user.length) {
          return res.status(404).send("username_taken");
        } else {
          const newUser = await db.create_user([username, hash]);
          const { user_id, belch_points } = newUser[0];

          req.session.user = {
            username: newUser[0].username,
            user_id,
            is_premium_user: newUser[0].premium_user === "yes",
            belch_points
          };

          return res.status(200).send(req.session.user);
        }
      });
    });
  },
  sign_in: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const user = await db.find_user([username]);
    if (user.length) {
      bcrypt.compare(password, user[0].password).then(result => {
        if (result) {
          const { user_id, belch_points } = user[0];
          req.session.user = {
            username: user[0].username,
            user_id,
            is_premium_user: user[0].premium_user === "yes",
            belch_points
          };
            return res.status(200).send(req.session.user);
        } else {
          return res.status(404).send("Incorrect Password");
        }
      });
    } else {
      return res
        .status(404)
        .send("Cant find that username.. are you sure you even exist?");
    }
  },
  logout: (req, res) => { 
    console.log(req.session)
    req.session.destroy()
    return res.status(200).send(req.session)
  },
  checkSession: (req, res) => { 
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(200).send(!!req.session.user)
    }
  }
};
