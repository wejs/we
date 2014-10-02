/**
 * A policy to return forbiden
 */
module.exports = function (req, res) {
  return res.forbidden('You are not permitted to perform this action.');
}