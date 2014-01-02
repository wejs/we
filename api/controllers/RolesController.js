/**
 * RolesController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

  index: function (req, res) {
    res.view('home/index');
  },

  create: function (req, res) {
    console.log('@todo role create');
    next();
  },

  update: function (req, res, next) {
    console.log('@todo role update');
    next();
  },

  delete: function (req, res, next) {
    console.log('@todo role delete');
    next();
  }

};
