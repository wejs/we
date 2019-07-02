/**
 * Show project information
 */

module.exports = function statusCommand(program) {

  const helpers = require('../helpers');
  let we;

  program
  .command('status')
  .alias('s')
  .description('Get project status')
  .action(function run() {
    we = helpers.getWe();

    we.bootstrap( (err, we)=> {
      if (err) return doneAll(err);

      // console.log(we);

      let str = '';

      str += we.pluginNames.length +' plugins: \n' + we.pluginNames.join(' ');

      str += '\n\n';

      if (we.view && we.view.themes) {
        // only show themes list if we-plugin-view is installed
        let themesLoaded = Object.keys(we.view.themes);
        str += themesLoaded.length + ' themes:\n' + themesLoaded.join(', ');

        str += '\n\n';
      }

      let modelNames = Object.keys(we.db.models);
      str += modelNames.length + ' models:\n' + modelNames.join(', ');

      str += '\n\n';

      let consollerNames = Object.keys(we.controllers);
      str += consollerNames.length + ' controllers:\n' + consollerNames.join(', ');

      str += '\n\n';

      let rTypeNames = Object.keys(we.responses.formaters);
      str += rTypeNames.length + ' response types (formaters):\n' + rTypeNames.join(', ');

      str += '\n\n';

      let methodNames = Object.keys(we.responses.methods);
      str += methodNames.length + ' response methods:\n' + methodNames.join(', ');

      str += '\n\n';

      let utilNames = Object.keys(we.utils);
      str += utilNames.length + ' utils:\n' + utilNames.join(', ');

      str += '\n\n';

      let rootAttrNames = Object.keys(we);
      str += 'Attrs: \nwe.' + rootAttrNames.join(' we.');

      str += '\n\n';

      if (we.email) {
        let emails = Object.keys(we.email.templates);
        str += emails.length + ' Emails: \nwe.email.templates.' +
                                  emails.join(' we.email.templates.');
        str += '\n\n';
      }

      if (we.view) {
        let names = Object.keys(we.view.themes);
        str += 'View themes: \n' + names.join(' ');

        str += '\n\n';

        if (we.view.configuration) {
          if (we.view.configuration.layouts) {
            let names = Object.keys(we.view.configuration.layouts);
            str += 'View layouts: \n' + names.join(' ');

            str += '\n\n';
          }

          if (we.view.configuration.helpers) {
            let helperNames = Object.keys(we.view.configuration.helpers);
            str += 'View helpers: \n' + helperNames.join(' ');

            str += '\n\n';
          }
        }
      }

      console.log(str);

      doneAll();
    });

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error on get we.js project status:', err);
      }
      // end / exit
      we.exit(process.exit);
    }
  });
};