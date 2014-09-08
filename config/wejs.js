/**
 * We.js configs override in you sub-project
 */

module.exports.wejs = {
  // default wembed provider for get wembeds
  wembedProvider: 'http://wembed.wejs.org',
  auth: {
    maxAge: 36000000
  },
  providers: {
    wembed: 'http://wembed.wejs.org',
    accounts: 'http://accounts.wejs.org',
    api: 'http://wejs.dev'
  }
};
