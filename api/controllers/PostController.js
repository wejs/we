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
      .done(function(err, posts) {
      // Error handling
      if (err) {
        return console.log(err);
        // TODO
      // Found multiple users!
      } else {
        res.format({
           'text/html': function(){
             res.view( 'home/index.ejs',
              {
                posts: posts
              });
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
    console.log('create post');
    var post = {};
    post.text = req.param("text");
    post.creator_id = req.user.id;

    Post.create(post).done(function(error, newPost) {
      if (error) {
        console.log(error);
        res.send(500, {error: res.i18n("DB Error") });
      } else {
        console.log('newPost',newPost);

        res.send({
          'post': newPost
        });

      }
    });
  }

};
