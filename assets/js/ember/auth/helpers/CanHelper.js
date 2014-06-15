
define(['we','ember'], function (we) {

  App.Permissions = {
    _perms:    {},
    register: function(name, klass) { this._perms[name] = klass; },
    get:      function(name, attrs) { return this._perms[name].create(attrs); },
    can:      function(name, attrs) { return this.get(name, attrs).get("can"); }
  };

  App.Permission = Ember.Object.extend({
    content: null,
    // TODO add binding in current user config
    currentUser : we.authenticatedUser
  });



  var get = Ember.get, isGlobalPath = Ember.isGlobalPath, normalizePath = Ember.Handlebars.normalizePath;

  var getProp = function(context, property, options) {
    if (isGlobalPath(property)) {
      return get(property);
    } else {
      var path = normalizePath(context, property, options.data);
      return get(path.root, path.path);
    }
  };

  Handlebars.registerHelper('can', function(permissionName, property, options){
    var attrs, context, key, path, permission;

    // property is optional, if we've only got 2 arguments then the property contains our options
    if (!options) {
      options = property;
      property = null;
    }

    context = (options.contexts && options.contexts[0]) || this;

    attrs = {};

    // if we've got a property name, get its value and set it to the permission's content
    // this will set the passed in `post` to the content eg:
    // {{#can editPost post}} ... {{/can}}
    if (property) {
      attrs.content = getProp(context, property, options);
    }

    // if we've got any options, find their values eg:
    // {{#can createPost project:Project user:App.currentUser}} ... {{/can}}
    for (key in options.hash) {
      path = options.hash[key];
      attrs[key] = getProp(context, path, options);
    }

    // find & create the permission with the supplied attributes
    permission = App.Permissions.get(permissionName, attrs);

    // ensure boundIf uses permission as context and not the view/controller
    // otherwise it looks for 'can' in the wrong place
    options.contexts = null;

    // bind it all together and kickoff the observers
    return Ember.Handlebars.helpers.boundIf.call(permission, "can", options);
  });

  // -- POST
  App.Permissions.register("createPost", App.Permission.extend({
    can: function() {
      return this.get("currentUser.id");
    }.property("currentUser.isAdmin")
  }));

  App.Permissions.register("editPost", App.Permission.extend({
    can: function(){
      if(!this.get("currentUser.id")){
        return false;
      }

      return this.get("currentUser.isAdmin") || this.get("content.creator.id") == this.get("currentUser.id");
    }.property("currentUser.isAdmin", "content")
  }));

  App.Permissions.register("deletePost", App.Permission.extend({
    can: function(){
      if(!this.get("currentUser.id")){
        return false;
      }

      return this.get("currentUser.isAdmin") || this.get("content.creator.id") == this.get("currentUser.id");
    }.property("currentUser.isAdmin", "content")
  }));

  // -- USER
  App.Permissions.register("editUser", App.Permission.extend({
    can: function(){
      if(!this.get("currentUser.id")){
        return false;
      }

      return this.get("currentUser.isAdmin") || this.get("content.id") == this.get("currentUser.id");
    }.property("currentUser.isAdmin", "content")
  }));

});