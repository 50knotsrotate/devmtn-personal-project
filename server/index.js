require("dotenv").config();
const authController = require("./Controllers/authController");
const commentsController = require('./Controllers/commentsController')
const express = require("express");
const app = express();
const massive = require("massive");
const breweryDB = require("brewerydb-node");
const session = require("express-session");
const axios = require("axios");

const { API_KEY, PORT, CONNECTION_STRING, SESSION_SECRET, SANDBOX_API } = process.env;
const brewDB = new breweryDB(API_KEY);

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: null, //here
    saveUninitialized: true,
    cookie: {maxAge: 100000000}
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
app.get('/logout', authController.logout);
app.get('/checksession', authController.checkSession)

app.get('/breweryInfo', function (req, res) {
  //res.status(200).send('ayy')
 
  const { id } = req.query
  axios
    .get(`https://api.brewerydb.com/v2/brewery/${id}/beers?key=${API_KEY}&withBreweries=Y&withSocialAccounts=Y&withIngredients=Y`)
    .then(response => {
      console.log(response)
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
 })


app.get('/comments/:id', commentsController.getComments)
app.post('/comments/:id', commentsController.addComment)


// app.get('/test', (req, res) => {
//     brewDB.search.all({q: 'carton'},  (param1, param2) => {
//         res.status(200).send(param2)
//     });
// })

// app.get("/", (req, res) => {
//   // axios.get(`https://sandbox-api.brewerydb.com/v2/brewery/2kYiJT/beers?key=${SANDBOX_API}`)
//   //   .then(response => {
//   //     res.status(200).send('ayy');
//   //   }).catch(err => { 
//   //     console.log(err)
//   //   })

//   brewDB.breweries.find({ id: "2kYiJT" }, function (err, data) { 
// res.status(200).send(data)
//   });
// })



app.post("/test", (req, res) => {
  const { latitude, longitude } = req.body
  
  axios
    .get(`https://api.brewerydb.com/v2/search/geo/point?lat=${latitude}&lng=${longitude}&key=${API_KEY}&radius=25`)
    .then(response => {
      console.log(response)
      res.status(200).send(response.data);
    }).catch(err => { 
      console.log(err)
    })
});



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



