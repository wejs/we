/**
 * Blueprints
 *
 * <%
 * //
 * //  [[ TODO: pull this out into sails-stringfile ]]
 * //
 * %>
 * Sails inspects your controllers, models, and configuration and binds
 * certain routes automatically. These dynamically generated routes are called blueprints.
 *
 * These settings are for the global configuration of controllers & blueprint routes.
 * You may also override these settings on a per-controller basis by defining a '_config'
 * key in any of your controller files, and assigning it an object, e.g.:
 * {
 *     // ...
 *     _config: { rest: false }
 *     // ...
 * }
 *
 * For more information on configuring controllers and blueprints, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.blueprints = {

  defaultLimit: 15,

  actions: false,

  // try this
  authWatch: true,

  rest: true,

  shortcuts: false,

  prefix: '/api/v1',

  pluralize: false

};
