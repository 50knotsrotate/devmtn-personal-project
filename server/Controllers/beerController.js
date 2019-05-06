const axios = require("axios");
const key = require("../index");

module.exports = {
  breweryLocation: (req, res) => {
    const { latitude, longitude } = req.body;
    axios
      .get(
        `https://api.brewerydb.com/v2/search/geo/point?lat=${latitude}&lng=${longitude}&key=${
          key.API_KEY
        }&radius=30`
      )
        .then(response => {

        res.status(200).send(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  breweryInfo: (req, res) => {
    const { id } = req.query;
    axios
      .get(
        `https://api.brewerydb.com/v2/brewery/${id}/beers?key=${
          key.API_KEY
        }&withBreweries=Y&withSocialAccounts=Y&withIngredients=Y`
      )
      .then(response => {
        res.status(200).send(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
