#Plugin install and database update

### Example file:

```js
module.exports = {
  /**
   * Check your plugin requirements
   * 
   * @param  {Object}   we   
   * @param  {Function} done callback
   */
  requirements: function(we, done) {
    // check your plugin requirements here
    done();
  },
  /**
   * Install function, run in we.js install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install: function install(we, done) {
    // example ...
    we.utils.async.series([
      /**
       * Check and create default roles required for all we.js projects
       *
       * @param  {object} we
       * @param  {Function} cb callback
       */
      function registerDefaultRoles(done) {
        we.utils.async.parallel([
          function unAuthenticatedRole(done) {
            we.acl.registerOneDefaltRole(we, 'unAuthenticated', done);
          },
          function authenticatedRole(done) {
            we.acl.registerOneDefaltRole(we, 'authenticated', done);
          },
          function ownerRole(done) {
            we.acl.registerOneDefaltRole(we, 'owner', done);
          },
          function administratorRole(done) {
            we.acl.registerOneDefaltRole(we, 'administrator', done);
          }
        ], done);
      }
    ], done);
    // ... end example
  },

  /**
   * Return a list of updates
   *
   * @param  {Object} we we.js object
   * @return {Array}    a list of update objects
   */
  updates: function updates(we) {
    return [
      {
        version: '0.3.25', // your plugin version
        update: function update0325(we, done) {
          // do the database update and then call done();
          done();
        }
      }
    ];
  }
};
```