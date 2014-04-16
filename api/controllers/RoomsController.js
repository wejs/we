/**
 * RoomsController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

  index: function (req, res) {
    Rooms.find({})
    .limit(10)
    .sort('createdAt ASC')
    .done(function(err, rooms) {

      // Error handling
      if (err) return res.serverError(err);

      // Found multiple rooms!
      res.format({
         'text/html': function(){
          // TODO add view to html requests
            res.view({
              rooms: rooms
            });
         },

         'application/json': function(){
            res.send({
              rooms: rooms
            });
         }
      });

    });
  },

  create: function (req, res) {
    var room = {};
    //room.text = req.param("text");
    room.creator_id = req.user.id;

    Rooms.create(room).done(function(error, newRoom) {
      if (error) {
        return res.send(500, {error: res.i18n("DB Error") });
      }

      res.send({
        'room': newRoom
      });

    });
  },

  update: function (req, res, next) {
    console.log('@todo rooms update');
    next();
  },

  delete: function (req, res, next) {
    console.log('@todo rooms delete');
    next();
  },

  usersGet: function (req, res, next){
    console.log('@todo rooms usersGet');
    next();
  },

  userAdd: function (req, res, next){
    console.log('@todo rooms userAdd');
    next();
  },

  userRemove: function (req, res, next){
    console.log('@todo rooms userRemove');
    next();
  }
};
