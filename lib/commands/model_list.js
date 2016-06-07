module.exports = function listModelsCommand(program) {
  /**
   * Run all we.js plugins and project cron tasks
   */

  var helpers = require('../helpers');
  var we;

  program
  .command('model:list [modelName]')
  .description('List models and attributes')
  .action(function run(modelName, x) {
    we = helpers.getWe();

    we.bootstrap(function (err) {
      if (err) return doneAll(err);

      var models = Object.keys(we.db.models)

      if (modelName) {
        models = models.filter(function(m){
          if (m == modelName) return true
          return false
        })
      }

      var text = '';

      models.forEach(function (m) {
        var model = we.db.models[m]

        text += m + ':\n';
        text += '  Attributes:\n';

        var attrNames = Object.keys(model.rawAttributes)

        attrNames.forEach(function (at) {
          text += '    ' + at + ': ' + getFieldType(model.rawAttributes[at]) + '\n'
        })

        var assocs = Object.keys(model.associations)
        if (assocs && assocs.length) {

          text += '  Associations:\n';

          assocs.forEach(function (a) {
            text += '    ' + a+':'+
              model.associations[a].associationType+' -> '+
              model.associations[a].target.name+
              '\n'
          })
        }
      })

      console.log(text);

      doneAll()
    });

    function getFieldType(attr) {
      try {
        return ( String(attr.type) || '' )
      } catch(e) {
        return ''
      }
    }

    function doneAll(err) {
      if (err) {
        we.log.error('Error on run list models commands', err);
      }
      // end / exit
      we.exit(function () { process.exit(); });
    }
  });
}
