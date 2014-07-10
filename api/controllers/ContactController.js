/**
 * ContactController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  findOneUserContact: function(req, res){
    var uid = req.param('uid');
    var contact_id = req.param('contact_id');

    Contact.findOne()
    .where({
      users: [
        uid,
        contact_id
      ]
    })
    .exec(function(err, contact){
      if (err) return res.serverError(err);

      if(!contact){
        return res.send({});
      }

      res.send(contact);
    });
  }
};
