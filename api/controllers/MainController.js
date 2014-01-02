/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */

  index: function (req, res) {
    res.view();
  },

  signup: function (req, res) {

  },
  login: function (req, res) {

  },

  dashboard: function (req, res) {
    //console.log(req);
    res.view();
  }
};
