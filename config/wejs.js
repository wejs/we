/**
 * We.js configs override in you sub-project
 */

module.exports.wejs = {
  // default wembed provider for get wembeds
  wembedProvider: 'http://wembed.wejs.org',

  providers: {
    wembed: 'http://wembed.wejs.org',
    accounts: 'http://accounts.wejs.dev',
    api: 'http://wejs.dev',
    cookieDomain: '.wejs.dev'
  }
};
