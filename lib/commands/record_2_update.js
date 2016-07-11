module.exports = function updateRecordCommand(program) {
  var helpers = require('../helpers');
  var we;

  program
  .command('record:update <modelName> <id> <attribute> <value>')
  .alias('ru')
  .description('Update one record attibute in database')
  .action(function run(modelName, id, attribute, value) {
    we = helpers.getWe();

    we.bootstrap(function (err) {
      if (err) return doneAll(err);

      if (!we.db.models[modelName]) {
        return doneAll('record with name '+modelName+' not found')
      }

      we.db.models[modelName]
      .findById(id)
      .then(function (r) {
        if (!r) {
          console.log(404)
        }

        r.setDataValue(attribute, value)

        return r.save()
        .then(function(){
          console.log('updated')

          doneAll()

          return null
        })
      })
      .catch(doneAll)
    });

    function doneAll(err) {
      if (err) {
        we.log.error(err)
      }
      // end / exit
      we.exit(function () { process.exit(); })
    }
  });
}
