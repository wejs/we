/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  // By default, your root route (aka home page) points to a view
  // located at `views/home/index.ejs`
  //
  // (This would also work if you had a file at: `/views/home.ejs`)
  '/main.js': {
    controller: 'main',
    action: 'requireJSmain'
  },

  '/configs.js': {
    controller: 'main',
    action: 'getConfigsJS'
  },

  '/api/v1/translations.js': {
    controller: 'main',
    action: 'getTranslations'
  },


  '/': {
    controller: 'main',
    action: 'index'
    //view: 'home/index'
  },

  'get /links' : {
    controller: 'links',
    action: 'index'
  },

  'get /templates/:id?.ejs' : {
       controller: 'template',
       action: 'ejs'
  },
  /*
  'get /templates/:id?.html' : {
       controller: 'template',
       action: 'find'
  },

  'get /templates/:action/:id?.html' : {
       controller: 'template',
       action: 'find'
  },
  */
  // Standard RESTful routing

  //
  // find contact relationship status
  'get /api/v1/user/:contactId/contact': {
    controller    : 'contact',
    action        : 'findOneUserContact'
  },
  // request
  'post /api/v1/user/:contactId/contact-request': {
    controller    : 'contact',
    action        : 'requestContact'
  },
  // accept
  'post /api/v1/user/:contactId/contact-accept': {
    controller    : 'contact',
    action        : 'acceptContact'
  },
  // ignore
  'post /api/v1/user/:contactId/contact-ignore': {
    controller    : 'contact',
    action        : 'ignoreContact'
  },
  // delete contact relation
  'delete /api/v1/user/:contactId/contact/': {
    controller    : 'contact',
    action        : 'deleteContact'
  },

  // -- FOLLOW
  // get
  // example: /api/v1/follow/post/1/2?flagType=follow
  'get /api/v1/follow/:model/:modelId?': {
    controller    : 'FollowController',
    action        : 'isFollowing'
  },

  // create
  // example: /api/v1/flag/post/1/2?flagType=follow
  'post /api/v1/follow/:model/:modelId': {
    controller    : 'FollowController',
    action        : 'follow'
  },

  // delete
  // example: /api/v1/flag/post/1/2?flagType=follow
  'delete /api/v1/follow/:model/:modelId': {
    controller    : 'FollowController',
    action        : 'unFollow'
  },

  // -- FLAG

  // get
  // example: /api/v1/flag/post/1/2?flagType=follow
  'get /api/v1/flag/:model/:modelId?/:userId?': {
    controller    : 'FlagController',
    action        : 'getModelFlags'
  },

  // create
  // example: /api/v1/flag/post/1/2?flagType=follow
  'post /api/v1/flag/:model/:modelId': {
    controller    : 'FlagController',
    action        : 'flag'
  },

  // delete
  // example: /api/v1/flag/post/1/2?flagType=follow
  'delete /api/v1/flag/:model/:modelId': {
    controller    : 'FlagController',
    action        : 'unFlag'
  },

  // -- USERS

  // User Auth

  'get /api/v1/auth/callback/:access_token': {
    controller    : 'auth',
    action        : 'oauth2Callback'
  },

  '/auth/logout': {
    controller    : 'auth',
    action        : 'logOut'
  },

  'get /api/v1/images': {
    controller    : 'images',
    action        : 'list'
  },

  'get /api/v1/images/:name?': {
    controller    : 'images',
    action        : 'findOne'
  },

  // Image style thumbnail | medium | large
  'get /api/v1/images/:style(original|mini|thumbnail|medium|large)/:name': {
    controller    : 'images',
    action        : 'findOne'
  },

  'get /api/v1/images/:id/data': {
    controller    : 'images',
    action        : 'findOneReturnData'
  },

  'get /api/v1/images-crop/:id': {
    controller    : 'images',
    action        : 'cropImage'
  },

  'post /api/v1/images': {
    controller    : 'images',
    action        : 'createRecord'
  },

  //  -- MESSENGER

  'get /messenger/start': {
      controller    : 'message',
      action        : 'start'
  },

  'get /api/v1/contact': {
      controller    : 'ContactController',
      action        : 'getAllAuthenticatedUserContacts'
  },


  // TODO use sails.js blueprint for set routes
  'get /api/v1/message/:id?': {
      controller    : 'message',
      action        : 'list'
  },

  'post /api/v1/message': {
      controller    : 'message',
      action        : 'createRecord'
  },

  // Return a list of messages between authenticated user and :uid user
  'get /messenger/messages/with-user/:uid?': {
      controller    : 'message',
      action        : 'messagesWithUser'
  },

  // Return messages without toIds and roomIds
  'get /messenger/messages/public': {
      controller    : 'message',
      action        : 'getPublicMessages'
  },

  // Send a message to show writing status
  'post /messenger/user/writing': {
      controller    : 'message',
      action        : 'emitIamWriting'
  },

  // -- ROOMS

  // 'get /rooms/:id?': {
  //     controller    : 'rooms',
  //     action        : 'index'
  // },
  // 'post /rooms': {
  //     controller    : 'rooms',
  //     action        : 'create'
  // },
  // 'put /rooms/:id?': {
  //     controller    : 'rooms',
  //     action        : 'update'
  // },
  // 'delete /rooms/:id?': {
  //     controller    : 'rooms',
  //     action        : 'destroy'
  // },

  // // get users in one room
  // 'get /rooms/users/': {
  //     controller    : 'rooms',
  //     action        : 'usersGet'
  // },

  // add user in room
  'post /rooms/users/:id?': {
      controller    : 'rooms',
      action        : 'userAdd'
  },

  // remove user from room
  'delete /rooms/users/:id?': {
      controller    : 'rooms',
      action        : 'userRemove'
  },

  // - NOTIFICATION

  // get current user notification count
  'get /api/v1/current-user/notification-count': {
    controller    : 'notification',
    action        : 'getUnreadNotificationCount'
  },

  // -- POSTS
  // @todo check ir this route set is need
  'get /api/v1/post': {
    controller    : 'post',
    action        : 'list'
  },

  'get /api/v1/post/:id': {
      controller    : 'post',
      action        : 'findOneRecord'
  },

  // @todo check ir this route set is need
  'post /api/v1/post': {
    controller    : 'post',
    action        : 'createRecord'
  },

  // 'put /api/v1/post': {
  //   controller    : 'post',
  //   action        : 'updateRecord'
  // },


  // -- FILES

  'get /files': {
      controller    : 'files',
      action        : 'index'
  },

  'post /files': {
      controller    : 'files',
      action        : 'create'
  },

  // -- COMMENT

  'post /comment': {
    controller    : 'comment',
    action        : 'create'
  },

  // -- ADMIN
  'get /admin/widgets': {
    controller    : 'main',
    action        : 'index'
  },

  'get /admin/roles': {
      controller    : 'roles',
      action        : 'index'
  },

  'post /admin/roles': {
      controller    : 'roles',
      action        : 'create'
  },

  'put /admin/roles/:id': {
      controller    : 'roles',
      action        : 'update'
  },


  'delete /admin/roles/:id': {
      controller    : 'roles',
      action        : 'delete'
  },


  // group routes
  'get /api/v1/group': {
      controller    : 'group',
      action        : 'list'
  }
};



/**
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *      `module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *    /foo/find/:id?  ->  search lampshades using specified criteria or with id=:id
 *
 *    /foo/create   ->  create a lampshade using specified values
 *
 *    /foo/update/:id ->  update the lampshade with id=:id
 *
 *    /foo/destroy/:id  ->  delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *    `module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *    get /foo/:id? ->  search lampshades using specified criteria or with id=:id
 *
 *    post /foo   -> create a lampshade using specified values
 *
 *    put /foo/:id  ->  update the lampshade with id=:id
 *
 *    delete /foo/:id ->  delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */

