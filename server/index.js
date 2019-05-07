require("dotenv").config();

//server variables
const {
  API_KEY,
  PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  TWILIO_SID,
  STRIPE_KEY,
  TWILIO_AUTH_TOKEN,
  STRIPE_SK_TEST
} = process.env;
//Controllers
const notificationsController = require("./Controllers/notificationsController");
const commentsController = require("./Controllers/commentsController");
const twilioController = require("./Controllers/twilioController");
const belchPointsController = require('./Controllers/belchPointsController');
const storeController = require('./Controllers/storeController')
const authController = require("./Controllers/authController");
const beerController = require('./Controllers/beerController')



//Middleware
const authMiddleware = require("./middleware/authMiddleware");
const userMiddleware = require("./middleware/userMiddleware");

const signUpMiddleware = [
  authMiddleware.checkCredentials,
  authController.sign_up,
  twilioController.welcome
];
const chuckNorrisMiddleware = [
  userMiddleware.premiumUsersOnly,
  authMiddleware.validatePhone,
  userMiddleware.checkBelchPoints,
  twilioController.sendChuck,
  userMiddleware.deductBelch
];

//dependencies
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const stripe = require("stripe")(STRIPE_SK_TEST);
const client = require("twilio")(TWILIO_SID, TWILIO_AUTH_TOKEN);
const brewDB = require('brewerydb-node');
const brewdb = new brewDB(API_KEY);
const axios = require('axios');

//Top level middleware
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: null,
    saveUninitialized: true,
    cookie: { maxAge: 100000000 }
  })
);

//Connection to SQL database
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("connected to db");
    db.init();
  })
  .catch(err => console.log('failed to connect to db'))

//Auth endpoints
app.post("/signup", ...signUpMiddleware);
app.post("/signin", authController.sign_in);
app.delete("/logout", authController.logout);
app.put("/user", authController.updateToPremium);

//Used exclusively by redux for keeping up with changes on the backend.
app.get("/session", authController.getSession);

app.post('/brewtest', (req, res) => {
  const { id } = req.body
  axios.get(`https://api.brewerydb.com/v2/brewery/${id}/locations&?key=${API_KEY}`)
    .then(response => { 
      res.status(200).send(response)
    }).catch(err => { 
      res.status(500).send(err.request.response)
    })
})
//Comment endpoints
app.get("/comments/:id", commentsController.getComments);
app.post("/comments/:id", commentsController.addComment);
app.put("/comments/:id", commentsController.editComment,notificationsController.addNotification, belchPointsController.updateBelchPoints); //This is for upvotes
app.delete("/comments/:id", commentsController.deleteComment);

//Get all comments for a user
app.get('/user/comments', commentsController.getUserComments)

//Notification endpoints
app.put("/notifications", notificationsController.updateNotifications);
app.get("/notifications", notificationsController.getNotifications);

//Brewery info
app.post("/test", beerController.breweryLocation);
app.get("/breweryInfo", beerController.breweryInfo);

//Store
app.post("/chuck", ...chuckNorrisMiddleware);
app.get("/store", storeController.getStore);

//For Stripe payments
app.post("/charge", authController.purchasePremium);


app.listen(PORT || 4000, () => { console.log(`Listening on ${PORT}`) });

module.exports.client = client;
module.exports.API_KEY = API_KEY;
module.exports.stripe = stripe