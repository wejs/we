/**
 * Run all we.js plugins and project cron tasks
 */
module.exports = function listModelsCommand(program) {

  const helpers = require('../helpers');
  let we;

  program
  .command('model:list [modelName]')
  .alias('ml')
  .description('List models and attributes')
  .action(function run(modelName) {
    we = helpers.getWe();

    we.bootstrap( (err)=> {
      if (err) return doneAll(err);

      let models = Object.keys(we.db.models);

      if (modelName) {
        models = models.filter( (m)=> {
          if (m == modelName) return true;
          return false;
        });
      }

      let text = '';

      models.forEach( (m)=> {
        const model = we.db.models[m];

        text += m + ':\n';
        text += '  Attributes:\n';

        let attrNames = Object.keys(model.rawAttributes);

        attrNames.forEach( (at)=> {
          text += '    ' + at + ': ' + getFieldType(model.rawAttributes[at]) + '\n';
        });

        const assocs = Object.keys(model.associations);
        if (assocs && assocs.length) {

          text += '  Associations:\n';

          assocs.forEach( (a)=> {
            text += '    ' + a+':'+
              model.associations[a].associationType+' -> '+
              model.associations[a].target.name+
              '\n';
          });
        }
      });

      console.log(text);

      doneAll();
    });

    function getFieldType(attr) {
      try {
        return ( String(attr.type) || '' );
      } catch(e) {
        return '';
      }
    }

    function doneAll(err) {
      if (err) {
        we.log.error('Error on run list models commands', err);
      }
      // end / exit
      we.exit(process.exit);
    }
  });
};
