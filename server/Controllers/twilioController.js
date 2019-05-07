const client = require("../index");
const axios = require("axios");

module.exports = {
  welcome: (req, res) => {
    client.client.messages.create({
      body: `Welcome to Belch, ${req.body.username}!`,
        from: "+12183668652",
      to: `+1${req.body.number}`
    }).then(message => {
        console.log(message.body)
    })
  },

  sendChuck: (req, res, next) => {
    const { number } = req.body;
    for (let i = 0; i < 5; i++) {
      axios.get("https://api.chucknorris.io/jokes/random").then(joke => {
        client.client.messages
          .create({
            body: joke.data.value,
            from: "+12183668652",
            to: `+1${number}`
          })
          .then(message => {
            res.sendStatus(200);
            next()
          })
          .catch(err => {
           return res.sendStatus(500);
          });
      });
    }
  }
};
