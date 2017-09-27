/**
 * Find record or one record in database command
 */
module.exports = function findRecordCommand(program) {
  const helpers = require('../helpers');
  let we;

  program
  .command('record:find <modelName> [id]')
  .alias('rf')
  .option('-w, --where <jsonObject>', 'Search with where')
  .description('Search for one database record')
  .action(function run(modelName, id, opts) {
    we = helpers.getWe();

    we.bootstrap( (err)=> {
      if (err) return doneAll(err);

      if (!we.db.models[modelName]) {
        return doneAll('record with name '+modelName+' not found');
      }

      let where = {};

      if (opts.where) {
        try {
          where = JSON.parse(opts.where);
        } catch(e) {
          return doneAll('Error in where query: '+ opts.where+' '+e);
        }
      }

      if (id) {
        where.id = id;
      }

      we.db.models[modelName]
      .findOne({
        where: where
      })
      .then( (r)=> {
        if (!r) {
          console.log(404);
        } else {
          console.log(r.get());
        }

        doneAll();
        return null;
      })
      .catch(doneAll);
    });

    function doneAll(err) {
      if (err) {
        we.log.error(err);
      }
      // end / exit
      we.exit(process.exit);
    }
  });
};
