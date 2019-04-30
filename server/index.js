require("dotenv").config();
const authController = require("./Controllers/authController");
const commentsController = require("./Controllers/commentsController");
const notificationsController = require('./Controllers/notificationsController')
const express = require("express");
const app = express();
const massive = require("massive");
const breweryDB = require("brewerydb-node");
const session = require("express-session");
const axios = require("axios");
const stripe = require("stripe")("My key");


const {
  API_KEY,
  PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  SANDBOX_API,
  STRIPE_KEY
} = process.env;
const brewDB = new breweryDB(API_KEY);

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: null, //here
    saveUninitialized: true,
    cookie: { maxAge: 100000000 }
  })
);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("connected to db");
    db.init();
  })
  .catch(err => {
    console.log("Failed to connect to DB");
  });

app.post("/signup", authController.sign_up);
app.post("/signin", authController.sign_in);
app.get("/logout", authController.logout);
app.get("/checksession", authController.checkSession);

app.get("/breweryInfo", function(req, res) {
  //res.status(200).send('ayy')

  const { id } = req.query;
  axios
    .get(
      `https://api.brewerydb.com/v2/brewery/${id}/beers?key=${API_KEY}&withBreweries=Y&withSocialAccounts=Y&withIngredients=Y`
    )
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});


app.get("/comments/:id", commentsController.getComments);
app.post("/comments/:id", commentsController.addComment);

app.put('/updateUser/', function (req, res) { 
  const db = req.app.get('db');
  const { id } = req.session.user
  
  db.pro(id).then(response => { 
    req.session.user.is_premium_user = 'true'
    console.log(req.session.user)
    res.status(200).send(response)
  })
})

// app.get("/ayy", function(req, res) {
//   brewDB.beer.getById("eGXsfq", {}, function(err, data) {
//     res.status(200).send(data);
//   });
// });

app.put("/updateNotifications", notificationsController.updateNotifications);
app.get('/getNotifications', notificationsController.getNotifications);


app.post("/charge", (req, res) => {
  stripe.charges.create({
    amount: 99,
    currency: 'usd',
    description: 'Thanks for joining us!',
    source: req.body.token.id
  }).then(response => { 
    res.status(200).send(response)
  })
});

app.post("/test", (req, res) => {
  const { latitude, longitude } = req.body

  axios
    .get(`https://api.brewerydb.com/v2/search/geo/point?lat=${latitude}&lng=${longitude}&key=${API_KEY}&radius=30`)
    .then(response => {
      res.status(200).send(response.data);
    }).catch(err => {
      console.log(err)
    })
});


// app.get("/test", function(req, res) {
//   axios
//     .get(
//       'https://api.brewerydb.com/v2/search/geo/point?lat=33.456128218&lng=111.982&radius=25&key=979ae9e5acc66f5be19a1ce3d59acb3f'
//     )
//     .then(response => {
//       res.status(200).send(response.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get("/test", (req, res) => {
//     brewDB.search.breweries({ q: "FW4NLn" }, (param1, data) => {
//       res.status(200).send(data);
//       console.log(data);
//     });
// }
// )

// app.get("/test", (req, res) => {
//     brewDB.beer.getById("QwmAOE", {withIngredients: 'Y'},  (param1, data) => {
//       res.status(200).send(data);
//       console.log(data);
//     });
// }
// )

//carton FW4NLn
///brewery/:breweryId/beers

// app.get("/test", (req, res) => {
//   brewDB.beer.getById(
//     "kIwONj",
//     { withBreweries: "Y", withIngredients: "Y" },
//     (param1, param2) => {
//       res.status(200).send(param2);
//     }
//   );
// });

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// => gets all info about a particualr beer, including where you can find the beer and ingredients

