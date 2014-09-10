/**
 * We.js configs override in you sub-project
 */

module.exports.wejs = {
  // default wembed provider for get wembeds
  // TODO remove this config and use providers.wembed
  wembedProvider: 'http://wembed.wejs.org',
  auth: {
    maxAge: 36000000
  },
  providers: {
    // Wembed generator server
    wembed: 'http://wembed.wejs.org',
    // Accounts with oauth and user rest server
    accounts: 'http://accounts.wejs.org',
    // default is null for use same host as current running project
    // Change it for ember.js get api data from other server
    api: null
  }
};
