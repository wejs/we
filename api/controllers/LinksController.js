/**
 * LinksController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req, res) {
    Links.find({})
    .limit(10)
    .sort('name ASC')
    .done(function(err, links) {

      // Error handling
      if (err) {
        return console.log(err);

      // Found multiple links!
      } else {
        console.log("links found:", links);
        return res.view({
          links: links
        });
      }
    });
  }

};
