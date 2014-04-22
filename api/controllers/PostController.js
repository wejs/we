/**
 * PostController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req,res) {

    Post.find({})
      .limit(10)
      .sort('updatedAt DESC')
      .populate('creator')
      .exec(function(err, posts) {
      // Error handling
      if (err) {
        return console.log(err);
        // TODO
      // Found multiple users!
      } else {
        res.format({
           'text/html': function(){

              // TODO add suport to html requests
              res.view("home/index.ejs");
              /*
             res.view( 'home/index.ejs',
              {
                posts: posts
              });
              */
           },

           'application/json': function(){
             res.send(posts);
           }
        });
      }
    });

    //res.view('home/index.ejs');
  },

  create : function (req, res, next){

    var post = {};
    post.text = req.param("text");
    post.creator = req.user.id;

    Post.create(post).exec(function(error, newPost) {
      if (error) {
        res.send(500, {error: res.i18n("DB Error") });
      } else {

        res.send({
          'post': newPost
        });

      }
    });
  }

};
