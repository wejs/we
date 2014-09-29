module.exports = function (sails) {
  return {

    /**
     * initialize hook
     *
     * @param  {Function} cb  callback
     */
    initialize: function (cb) {
      cb();
    },

    // set locale on route before hook
    routes: {
      before: {
        '/*': function setWeLocale(req, res, next) {
          if ( req.user && req.user.language ) {
            req.setLocale(req.user.language);
          } else if(sails.config.i18n.defaultLocale) {
            req.setLocale(sails.config.i18n.defaultLocale);
          }

          next();
        }
      }
    }
  }
}