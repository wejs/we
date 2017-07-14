/**
 * Update one record attribute
 */
module.exports = function updateRecordCommand(program) {
  const helpers = require('../helpers');
  let we;

  program
  .command('record:update <modelName> <id> <attribute> <value>')
  .alias('ru')
  .description('Update one record attibute in database')
  .action(function run(modelName, id, attribute, value) {
    we = helpers.getWe();

    we.bootstrap( (err)=> {
      if (err) return doneAll(err);

      if (!we.db.models[modelName]) {
        return doneAll('record with name '+modelName+' not found');
      }

      we.db.models[modelName]
      .findById(id)
      .then( (r)=> {
        if (!r) {
          console.log(404);
        }

        r.setDataValue(attribute, value);

        return r.save()
        .then( ()=> {
          console.log('updated');

          doneAll();

          return null;
        });
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
