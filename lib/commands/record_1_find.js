module.exports = function findRecordCommand(program) {
  var helpers = require('../helpers');
  var we;

  program
  .command('record:find <modelName> [id]')
  .alias('rf')
  .option('-w, --where <jsonObject>', 'Search with where')
  .description('Search for one database record')
  .action(function run(modelName, id, opts) {
    we = helpers.getWe();

    we.bootstrap(function (err) {
      if (err) return doneAll(err);

      if (!we.db.models[modelName]) {
        return doneAll('record with name '+modelName+' not found')
      }

      var where = {}

      if (opts.where) {
        try {
          where = JSON.parse(opts.where)
        } catch(e) {
          return doneAll('Error in where query: '+ opts.where+' '+e)
        }
      }

      if (id) {
        where.id = id
      }

      we.db.models[modelName]
      .findOne({
        where: where
      })
      .then(function(r) {
        if (!r) {
          console.log(404)
        } else {
          console.log(r.get())
        }

        doneAll();
      })
      .catch(doneAll)
    });

    function doneAll(err) {
      if (err) {
        we.log.error(err);
      }
      // end / exit
      we.exit(function () { process.exit(); });
    }
  });
}
