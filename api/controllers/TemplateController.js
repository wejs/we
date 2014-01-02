/*---------------------
  :: Template
  -> controller
---------------------*/

var fs = require('fs');

module.exports = {
  index: function (req,res) {
    var listOfAssetSourcePaths = sails.config.assets.sequence;
    var htmlString = "";
    async.each(listOfAssetSourcePaths, function (path,cb) {
      fs.readFile(path,function (err, contents) {
        if (err) return cb(err);
        htmlString += contents;
      });
    }, function (err) {
      if (err) return res.send(err,500);
      res.contentType('text/html');
      res.send(htmlString);
    });
  },

  ejs: function(req,res) {
    var tpl = req.param('id');
    console.log('templates/' + tpl + '.ejs');
    res.view(
      'template/' + tpl + '.ejs',
      {layout: ''}
    );
  },

  find: function(req,res) {
    var tpl = req.param('id');
    var action = '';

    if( req.param('action') ){
      action = req.param('action') + '/';
    }

    fs.readFile( process.cwd() + '/assets/templates/views/remote/' + action + tpl + '.html',function (err, contents) {
      if (err){
        console.log(err);
        res.contentType('text/html');
        res.send(404 ,'Not found');
      }
      else {
        res.contentType('text/html');
        res.send(contents);
      }
    });
  }
};

