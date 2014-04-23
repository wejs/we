angular.module('we_templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('en/angularjs/admin/views/create_role_form.html',
    "create_role_form.html"
  );


  $templateCache.put('en/angularjs/admin/views/roles.html',
    "roles.html"
  );


  $templateCache.put('en/angularjs/avatar/views/change-avatar-form.html',
    "<form id=\"avatar-upload\" action=\"user/avatar/\"  class=\"form-upload-avatar\" name=\"uploadAvatarForm\" method=\"post\" data-file-upload=\"options\" enctype=\"multipart/form-data\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">Change avatar</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"row file-uploader\">\n" +
    "      <div class=\"col-md-8\">\n" +
    "        <input type=\"file\" ng-file-select=\"onFileSelect($files)\" >\n" +
    "      </div>\n" +
    "      <div class=\"col-md-4\">\n" +
    "        <button class=\"btn btn-primary\" type=\"buttom\" data-ng-click=\"submit($event)\">Upload and save</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"file-upload-progress\">\n" +
    "      <progressbar max=\"max\" value=\"dynamic\" type=\"{{type}}\" class=\"progress-striped {{progressActive}}\">\n" +
    "        <span data-ng-show=\"progressActive\" style=\"color:black; white-space:nowrap;\">{{dynamic}} / {{max}}</span>\n" +
    "      </progressbar>\n" +
    "    </div>\n" +
    "\n" +
    "    <div>\n" +
    "      <avatar user-id=\"user.id\" class=\"creator-avatar\"></avatar>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\"  data-ng-click=\"modalClose()\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('en/angularjs/news/views/news-block.html',
    "<div class=\"news-block\">\n" +
    "  <div class=\"news-itens itens\">\n" +
    "\n" +
    "    <div id=\"activity-{{activity.id}}\" data-ng-repeat=\"activity in activities\" class=\"new-item activity\">\n" +
    "\n" +
    "      <avatar user-id=\"{{activity.actor.id}}\" class=\"creator-avatar\"></avatar>\n" +
    "      {{activity.title}}\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"footer\">\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('en/angularjs/post/views/index.html',
    "<div id=\"posts\" class=\"posts \">\n" +
    "  <div class=\"sharebox-area masonry-brick  content-block\">\n" +
    "    <we-sharebox></we-sharebox>\n" +
    "  </div>\n" +
    "  <div data-ng-repeat=\"post in posts\" class=\"masonry-brick content-block post\">\n" +
    "    <we-post-teaser id=\"post-{{post.id}}\" data-post=\"post\"></we-post-teaser>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('en/angularjs/post/views/post-teaser.html',
    "<div class=\"post-teaser teaser\">\n" +
    "  <div class=\"header\">\n" +
    "\n" +
    "    <avatar user-id=\"{{post.creator.id}}\" class=\"creator-avatar\"></avatar>\n" +
    "\n" +
    "    <a href=\"/post/{{post.id}}\">\n" +
    "\n" +
    "  {{post.id}}\n" +
    "    </a>\n" +
    "    <div class=\"creator\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content\">\n" +
    "    <div data-ng-hide=\"post.editing\" class=\"post-text\" >{{post.text}}</div>\n" +
    "\n" +
    "    <form data-ng-show=\"post.editing\" id=\"form-post-{{post.id}}\" class=\"edit-post\">\n" +
    "      <textarea class=\"post-text\"ng-model=\"post.text\"></textarea>\n" +
    "      <div class=\"actions\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" data-ng-click=\"update()\">\n" +
    "          <span class=\"glyphicon glyphicon-ok\"> Save </span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"cancelEdit()\">\n" +
    "          <span class=\"glyphicon glyphicon-remove\"> Cancel </span>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"footer ng-scope\">\n" +
    "      <div class=\"actions\">\n" +
    "          <span class=\"social pull-left\">\n" +
    "              <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"up($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-thumbs-up\"></span>\n" +
    "              </button>\n" +
    "              <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"down($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-thumbs-down\"></span>\n" +
    "              </button>\n" +
    "          </span>\n" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-share-alt\"></span> Share\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-edit\"></span> Edit\n" +
    "          </button>\n" +
    "          <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-remove\"></span> Delete\n" +
    "          </button>\n" +
    "      </div>\n" +
    "      <div class=\"comments\">\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"comment-add\">\n" +
    "          <img class=\"avatar-small pull-left\" src=\"/imgs/avatars/user-avatar.png\">\n" +
    "          <div class=\"comment-add-buttom\" role=\"button\">Comentar...</div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('en/angularjs/post/views/post.html',
    "<div class=\"post full\">\n" +
    "  <div class=\"header\">\n" +
    "\n" +
    "    <avatar user-id=\"{{post.creator.id}}\" class=\"creator-avatar\"></avatar>\n" +
    "\n" +
    "  {{post.id}}\n" +
    "    </a>\n" +
    "    <div class=\"creator\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  {{post.id}}\n" +
    "  {{post.creator_id}}\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"post-full\">\n" +
    "\n" +
    "      <div class=\"content\">\n" +
    "        <div class=\"post-text\">{{post.text}}</div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"footer ng-scope\">\n" +
    "      <div class=\"actions\">\n" +
    "          <span class=\"social pull-left\">\n" +
    "              <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"up($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-thumbs-up\"></span>\n" +
    "              </button>\n" +
    "              <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"down($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-thumbs-down\"></span>\n" +
    "              </button>\n" +
    "          </span>\n" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-share-alt\"></span> Share\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-edit\"></span> Edit\n" +
    "          </button>\n" +
    "          <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-remove\"></span> Delete\n" +
    "          </button>\n" +
    "      </div>\n" +
    "      <div class=\"comments\">\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"comment-add\">\n" +
    "        <img class=\"avatar-small pull-left\" src=\"/imgs/avatars/user-avatar.png\">\n" +
    "        <form action=\"/comment\" method=\"POST\" class=\"comment ng-valid\">\n" +
    "\n" +
    "          <div class=\"form-group\">\n" +
    "              <label for=\"Post_content\">Add a comment</label>\n" +
    "              <textarea name=\"comment\" class=\"form-control comment ng-pristine ng-valid\" data-ng-click=\"openSharebox()\" data-ng-model=\"post.content\"></textarea>\n" +
    "          </div>\n" +
    "          <button type=\"button\" class=\"btn btn-primary\">Submit</button>\n" +
    "          <input name=\"creator_id\" type=\"hidden\" value=\"{{user.id}}\">\n" +
    "        </form>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('en/angularjs/post/views/sharebox.html',
    "<form action=\"/post\" method=\"POST\" data-ng-submit=\"submit($event,post)\" class=\"sharebox ng-scope ng-pristine ng-valid\">\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "      <label for=\"Post_content\">What is happening?</label>\n" +
    "      <textarea name=\"content\" class=\"form-control post-content ng-pristine ng-valid\" data-ng-click=\"openSharebox()\" data-ng-model=\"post.content\"></textarea>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"attach-options\">\n" +
    "    <span><a class=\"btn btn-xs btn-default\"><i class=\"icon-picture\"></i> Images</a></span>\n" +
    "    <span><a class=\"btn btn-xs btn-default\"><i class=\"icon-bookmark\"></i> Link</a></span>\n" +
    "  </div>\n" +
    "\n" +
    "  <div data-ng-show=\"sharebox.open\" class=\"footer\" style=\"display: block;\">\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <input name=\"toIds\" class=\"form-control\" type=\"text\" value=\"\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "      <button type=\"submit\" class=\"btn btn-primary\">\n" +
    "        <span class=\"glyphicon glyphicon-ok\"></span> Share\n" +
    "      </button>\n" +
    "      <button type=\"button\" data-ng-click=\"closeSharebox()\" class=\"btn btn-default cancel\">Cancel</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>"
  );


  $templateCache.put('en/angularjs/site/views/error404.html',
    "Page Not Found - Error 404"
  );


  $templateCache.put('en/angularjs/site/views/highlighted.html',
    "<div ng-show=\"aboutShow\">\n" +
    "  <div ng-include=\" '/angularjs/site/views/home-about-site.html' \"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('en/angularjs/site/views/home-about-site.html',
    "\n" +
    "<section role=\"section\" id=\"section-start\" class=\"section-start\">\n" +
    "  <div class=\"container\">\n" +
    "\n" +
    "    <!-- welcome -->\n" +
    "    <aside class=\"welcome\">\n" +
    "      <h1 class=\"title\">We Social</h1>\n" +
    "      <h3 class=\"text\">This is a template for social network. You can found a basic scaffold for start your project based in a front-end framework focused in <span class=\"strong\">reusable components</span> and in a <span class=\"strong\">mobile first</span> principle. <span class=\"strong\">Enjoy.</span></h3>\n" +
    "    </aside>\n" +
    "    <!-- /welcome -->\n" +
    "\n" +
    "    <!-- signup-form -->\n" +
    "    <div data-ui-view=\"signup-form\"></div>\n" +
    "    <!-- /signup-form -->\n" +
    "  </div>\n" +
    "</section>\n"
  );


  $templateCache.put('en/angularjs/site/views/home-logged-in.html',
    ""
  );


  $templateCache.put('en/angularjs/site/views/home.html',
    "<section role=\"section\" id=\"home-main\" class=\"home-main\">\n" +
    "  <div class=\"sharebox-area masonry-brick  content-block\">\n" +
    "    <we-sharebox></we-sharebox>\n" +
    "  </div>\n" +
    "\n" +
    "  <div id=\"posts\" data-ng-controller=\"PostController\" class=\"news\">\n" +
    "    <div data-ng-repeat=\"post in posts\" class=\"masonry-brick content-block post\">\n" +
    "      <we-post-teaser id=\"post-{{post.id}}\" data-post=\"post\"></we-post-teaser>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>\n"
  );


  $templateCache.put('en/angularjs/site/views/sidebar.html',
    "<div class=\"well sidebar-nav\">\n" +
    "  <ul class=\"nav\">\n" +
    "    <li>Menu do usuario</li>\n" +
    "    <li class=\"active\"><a href=\"#\">Link</a></li>\n" +
    "    <li><a href=\"#\">Grupos</a></li>\n" +
    "    <li><a href=\"#\">Contatos</a></li>\n" +
    "  </ul>\n" +
    "</div><!--/.well -->"
  );


  $templateCache.put('en/angularjs/user/views/account.html',
    "view account"
  );


  $templateCache.put('en/angularjs/user/views/forgotPasswordForm.html',
    "<div class=\"col-md-6 col-md-offset-3\">\n" +
    "  <div class=\"forgot-password-area panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Forgot Password</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <form method=\"post\" action=\"\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">@</span>\n" +
    "            <input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"E-mail\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"input-group\">\n" +
    "            <input class=\"form-control btn btn-primary\" type=\"button\" value=\"Submit\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('en/angularjs/user/views/index.html',
    "<div id=\"dynamic-grid-container\" class=\"users \">\n" +
    "  <div data-ng-repeat=\"user in users\" class=\"user user-teaser teaser\">\n" +
    "    <div data-ng-include=\"'/angularjs/user/views/user-teaser.html'\"></div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('en/angularjs/user/views/login-form.html',
    "<!-- form-login -->\n" +
    "<div class=\"form-login\" data-ng-controller=\"LoginCtrl\" data-ng-hide=\"authorized\">\n" +
    "  <form class=\"form-inline\" role=\"form\" name=\"loginForm\" method=\"post\" data-ng-submit=\"login($event)\">\n" +
    "    <div class=\"form-group left\">\n" +
    "      <label class=\"sr-only\">Email address</label>\n" +
    "      <input type=\"email\" class=\"form-control input-sm\" placeholder=\"Enter email\" id=\"email\" name=\"email\" data-ng-model=\"user.email\" required >\n" +
    "\n" +
    "      <div class=\"checkbox\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\" value=\"remember-me\" id=\"remember\" name=\"remember\" data-ng-model=\"user.remember\"> Remember me\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"form-group right\">\n" +
    "      <label class=\"sr-only\">Password</label>\n" +
    "      <input type=\"password\" class=\"form-control input-sm\" placeholder=\"Password\"  id=\"password\" name=\"password\" data-ng-model=\"user.password\">\n" +
    "\n" +
    "      <div class=\"lost-password\">\n" +
    "        <a class=\"link\" href=\"#\">Forgot password?</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button id=\"loginButton\" class=\"btn btn-primary\" type=\"submit\" class=\"btn btn-sm btn-success\">Sign in</button>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<!-- /form-login -->"
  );


  $templateCache.put('en/angularjs/user/views/signup-form.html',
    "<aside class=\"form-signup\">\n" +
    "  <h2 class=\"form-signin-heading\">\n" +
    "    Create account\n" +
    "    <br><small class=\"subtitle\">It’s free and always will be.</small>\n" +
    "  </h2>\n" +
    "\n" +
    "  <form data-ng-controller=\"CreateAccountCtrl\" data-ng-submit=\"submit($event)\" name=\"createAccountForm\" class=\"user-signup-form ng-pristine ng-invalid ng-invalid-required\" method=\"POST\">    \n" +
    "    <!-- input: username -->\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <label for=\"name\" class=\"input-group-addon\">\n" +
    "          <i class=\"fa fa-user fa-lg\"></i>\n" +
    "        </label>\n" +
    "      <input data-ng-model=\"user.name\" id=\"name\" type=\"text\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Pick a username\" autofocus=\"\" name=\"name\" required=\"\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- /input: username -->\n" +
    "    \n" +
    "    <!-- input: email -->\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <label for=\"email\" class=\"input-group-addon\">\n" +
    "          <i class=\"fa fa-envelope fa-lg\"></i>\n" +
    "        </label>\n" +
    "        <input data-ng-model=\"user.email\" id=\"email\" type=\"email\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required ng-valid-email\" placeholder=\"Your email\" name=\"email\" required=\"\">\n" +
    "      </div>\n" +
    "      <div class=\"message\" data-ng-repeat=\"message in user.email.messages\">\n" +
    "        <div class=\"message.type\">{{message.message}}</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- /input: email -->\n" +
    "    \n" +
    "    <!-- input: password -->\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <label for=\"password\" class=\"input-group-addon\">\n" +
    "          <i class=\"fa fa-key fa-lg\"> </i>\n" +
    "        </label>\n" +
    "        <input data-ng-model=\"user.password\" id=\"password\" type=\"password\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Password\" name=\"password\" required=\"\">\n" +
    "\n" +
    "        <!-- input: confirm-password -->\n" +
    "        <label for=\"confirm-password\" class=\"input-group-btn\">\n" +
    "          <i class=\"glyphicon glyphicon-user\"> </i>\n" +
    "        </label>\n" +
    "        <input data-ng-model=\"user.confirmPassword\" id=\"confirm-password\" type=\"password\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Confirm password\" name=\"confirmPassword\" required=\"\">\n" +
    "        <!-- /input: confirm-password -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- /input: password -->\n" +
    "    \n" +
    "    <!-- button -->\n" +
    "    <button class=\"btn btn-lg btn-success btn-block\" type=\"submit\">\n" +
    "      Sign up\n" +
    "      <i class=\"glyphicon glyphicon-chevron-right\"> </i>\n" +
    "    </button>\n" +
    "    <!-- /button -->\n" +
    "\n" +
    "    <div class=\"message\" data-ng-repeat=\"message in messages\">\n" +
    "      <div class=\"message.type\">{{message.message}}</div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "\n" +
    "\n" +
    "  <div class=\"agree-terms\">\n" +
    "    By clicking Sign Up, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use.\n" +
    "  </div>\n" +
    "\n" +
    "</aside>"
  );


  $templateCache.put('en/angularjs/user/views/signup.html',
    "<div class=\"col-lg-6\">\n" +
    "  <h2 class=\"form-signin-heading\">Create a account</h2>\n" +
    "  <form data-ng-controller=\"CreateAccountCtrl\" data-ng-submit=\"submit($event)\" name=\"createAccountForm\" class=\"create-account-form\" method=\"post\">\n" +
    "    <span class=\"error alert alert-dismissable\" data-ng-show=\"createAccountForm.input.$error.required\">Required!</span><br>\n" +
    "\n" +
    "    <li ng-repeat=\"errors in error\">\n" +
    "        <div data-ng-show=\"error != ''\" class=\"alert alert-danger alert-dismissable\">\n" +
    "          <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n" +
    "          <span class=\"data\">{{error}}</span>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group input-group-lg\">\n" +
    "        <label for=\"name\">Name</label>\n" +
    "        <input data-ng-model=\"user.name\" id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Name\" autofocus=\"\" name=\"name\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group input-group-lg\">\n" +
    "        <label for=\"email\">Email</label>\n" +
    "        <input data-ng-model=\"user.email\" id=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email address\" name=\"email\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group input-group-lg\">\n" +
    "        <label for=\"password\">Password</label>\n" +
    "        <input data-ng-model=\"user.password\" id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group input-group-lg\">\n" +
    "        <label for=\"confirm-password\">Confirm password</label>\n" +
    "        <input data-ng-model=\"user.confirmPassword\" id=\"confirm-password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm password\" name=\"confirmPassword\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "      <input class=\"btn btn-lg btn-primary btn-block\" type=\"submit\" value=\"Sign in\">\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"col-lg-6\">\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('en/angularjs/user/views/user-menu.html',
    "<ul class=\"nav navbar-nav navbar-right\" ng-show=\"user.authorized\">\n" +
    "  <li>\n" +
    "    <a href=\"#\" class=\"dropdown-toggle user-menu-link\" data-toggle=\"dropdown\">\n" +
    "      <span class=\"avatar-small\">\n" +
    "        <avatar user-id=\"{{user.id}}\"></avatar>\n" +
    "      </span>\n" +
    "      <span class=\"user-name\" data-ng-bind=\"user.name\">{{user.name}}</span><b class=\"caret\"></b>\n" +
    "    </a>\n" +
    "    <ul class=\"dropdown-menu\">\n" +
    "      <li data-ng-controller=\"AvatarModalController\">\n" +
    "        <a data-ng-click=\"openModal()\" href=\"#ChangeAvatarModal\">Change Avatar</a>\n" +
    "      </li>\n" +
    "      <li class=\"divider\"></li>\n" +
    "      <li><a href=\"/users/{{user.id}}\">View account</a></li>\n" +
    "      <li><a href=\"/users/{{user.id}}/edit/\">Edit account</a></li>\n" +
    "      <li class=\"divider\"></li>\n" +
    "      <li><a href=\"/users/logout\">Sing out</a></li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "</ul>"
  );


  $templateCache.put('en/angularjs/user/views/user-teaser.html',
    "<div class=\"header\">\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"content\">\n" +
    "\n" +
    "  <h3><a href=\"/users/{{user.id}}\">\n" +
    "    {{user.name}}\n" +
    "  </a>\n" +
    "  </h3>\n" +
    "  <avatar data-avatar-link=\"/users/{{user.id}}\" data-avatar-size=\"medium\" user-id=\"user.id\"></avatar>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"footer ng-scope\">\n" +
    "    <div class=\"actions\">\n" +
    "      <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-plus\"></span> Add in contacts\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-plus\"></span> Follow\n" +
    "      </button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('en/angularjs/user/views/user.html',
    "\n" +
    "<div class=\"user-full\">\n" +
    "  <div class=\"header\">\n" +
    "    <h1 class=\"user-name\">{{user.name}}</h1>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"user-area-data row\">\n" +
    "      <div class=\"user-area-data-left col-md-4\" >\n" +
    "        <span data-avatar-size=\"medium\" user-id=\"user.id\"></span>\n" +
    "      </div>\n" +
    "      <div class=\"user-area-data-rigth col-md-6\">\n" +
    "        <div class=\"user-bio\">\n" +
    "          Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.\n" +
    "\n" +
    "          Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"user-area-seccond-row row\">\n" +
    "      <div class=\"user-area-sidebar col-md-3\">\n" +
    "        adicionar os blocos aqui ...\n" +
    "      </div>\n" +
    "      <div class=\"user-area-activities col-md-7\">\n" +
    "      <h3>Time line</h3>\n" +
    "      .... adicionar as atividades do usuário atual aqui ...\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "      <div class=\"user-bio-text\">{{user.bio}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"footer\">\n" +
    "    <div class=\"actions\">\n" +
    "        <span class=\"social pull-left\">\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-plus\"></span> Add in contacts\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-plus\"></span> Follow\n" +
    "          </button>\n" +
    "        </span>\n" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\">\n" +
    "          <span class=\"glyphicon glyphicon-edit\"></span> Edit\n" +
    "        </button>\n" +
    "        <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($index,$event)\">\n" +
    "          <span class=\"glyphicon glyphicon-remove\"></span> Delete\n" +
    "        </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('pt-br/angularjs/admin/views/create_role_form.html',
    "create_role_form.html"
  );


  $templateCache.put('pt-br/angularjs/admin/views/roles.html',
    "roles.html"
  );


  $templateCache.put('pt-br/angularjs/avatar/views/change-avatar-form.html',
    "<form id=\"avatar-upload\" action=\"user/avatar/\"  class=\"form-upload-avatar\" name=\"uploadAvatarForm\" method=\"post\" data-file-upload=\"options\" enctype=\"multipart/form-data\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">Change avatar</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"row file-uploader\">\n" +
    "      <div class=\"col-md-8\">\n" +
    "        <input type=\"file\" ng-file-select=\"onFileSelect($files)\" >\n" +
    "      </div>\n" +
    "      <div class=\"col-md-4\">\n" +
    "        <button class=\"btn btn-primary\" type=\"buttom\" data-ng-click=\"submit($event)\">Upload and save</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"file-upload-progress\">\n" +
    "      <progressbar max=\"max\" value=\"dynamic\" type=\"{{type}}\" class=\"progress-striped {{progressActive}}\">\n" +
    "        <span data-ng-show=\"progressActive\" style=\"color:black; white-space:nowrap;\">{{dynamic}} / {{max}}</span>\n" +
    "      </progressbar>\n" +
    "    </div>\n" +
    "\n" +
    "    <div>\n" +
    "      <avatar user-id=\"user.id\" class=\"creator-avatar\"></avatar>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\"  data-ng-click=\"modalClose()\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('pt-br/angularjs/news/views/news-block.html',
    "<div class=\"news-block\">\n" +
    "  <div class=\"news-itens itens\">\n" +
    "\n" +
    "    <div id=\"activity-{{activity.id}}\" data-ng-repeat=\"activity in activities\" class=\"new-item activity\">\n" +
    "\n" +
    "      <avatar user-id=\"{{activity.actor.id}}\" class=\"creator-avatar\"></avatar>\n" +
    "      {{activity.title}}\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"footer\">\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('pt-br/angularjs/post/views/index.html',
    "<div id=\"posts\" class=\"posts \">\n" +
    "  <div class=\"sharebox-area masonry-brick  content-block\">\n" +
    "    <we-sharebox></we-sharebox>\n" +
    "  </div>\n" +
    "  <div data-ng-repeat=\"post in posts\" class=\"masonry-brick content-block post\">\n" +
    "    <we-post-teaser id=\"post-{{post.id}}\" data-post=\"post\"></we-post-teaser>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('pt-br/angularjs/post/views/post-teaser.html',
    "<div class=\"post-teaser teaser\">\n" +
    "  <div class=\"header\">\n" +
    "\n" +
    "    <avatar user-id=\"{{post.creator.id}}\" class=\"creator-avatar\"></avatar>\n" +
    "\n" +
    "    <a href=\"/post/{{post.id}}\">\n" +
    "\n" +
    "  {{post.id}}\n" +
    "    </a>\n" +
    "    <div class=\"creator\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content\">\n" +
    "    <div data-ng-hide=\"post.editing\" class=\"post-text\" >{{post.text}}</div>\n" +
    "\n" +
    "    <form data-ng-show=\"post.editing\" id=\"form-post-{{post.id}}\" class=\"edit-post\">\n" +
    "      <textarea class=\"post-text\"ng-model=\"post.text\"></textarea>\n" +
    "      <div class=\"actions\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" data-ng-click=\"update()\">\n" +
    "          <span class=\"glyphicon glyphicon-ok\"> Save </span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"cancelEdit()\">\n" +
    "          <span class=\"glyphicon glyphicon-remove\"> Cancel </span>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"footer ng-scope\">\n" +
    "      <div class=\"actions\">\n" +
    "          <span class=\"social pull-left\">\n" +
    "              <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"up($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-thumbs-up\"></span>\n" +
    "              </button>\n" +
    "              <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"down($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-thumbs-down\"></span>\n" +
    "              </button>\n" +
    "          </span>\n" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-share-alt\"></span> Share\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-edit\"></span> Edit\n" +
    "          </button>\n" +
    "          <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-remove\"></span> Delete\n" +
    "          </button>\n" +
    "      </div>\n" +
    "      <div class=\"comments\">\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"comment-add\">\n" +
    "          <img class=\"avatar-small pull-left\" src=\"/imgs/avatars/user-avatar.png\">\n" +
    "          <div class=\"comment-add-buttom\" role=\"button\">Comentar...</div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('pt-br/angularjs/post/views/post.html',
    "<div class=\"post full\">\n" +
    "  <div class=\"header\">\n" +
    "\n" +
    "    <avatar user-id=\"{{post.creator.id}}\" class=\"creator-avatar\"></avatar>\n" +
    "\n" +
    "  {{post.id}}\n" +
    "    </a>\n" +
    "    <div class=\"creator\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  {{post.id}}\n" +
    "  {{post.creator_id}}\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"post-full\">\n" +
    "\n" +
    "      <div class=\"content\">\n" +
    "        <div class=\"post-text\">{{post.text}}</div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"footer ng-scope\">\n" +
    "      <div class=\"actions\">\n" +
    "          <span class=\"social pull-left\">\n" +
    "              <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"up($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-thumbs-up\"></span>\n" +
    "              </button>\n" +
    "              <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"down($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-thumbs-down\"></span>\n" +
    "              </button>\n" +
    "          </span>\n" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-share-alt\"></span> Share\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-edit\"></span> Edit\n" +
    "          </button>\n" +
    "          <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-remove\"></span> Delete\n" +
    "          </button>\n" +
    "      </div>\n" +
    "      <div class=\"comments\">\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"comment-add\">\n" +
    "        <img class=\"avatar-small pull-left\" src=\"/imgs/avatars/user-avatar.png\">\n" +
    "        <form action=\"/comment\" method=\"POST\" class=\"comment ng-valid\">\n" +
    "\n" +
    "          <div class=\"form-group\">\n" +
    "              <label for=\"Post_content\">Add a comment</label>\n" +
    "              <textarea name=\"comment\" class=\"form-control comment ng-pristine ng-valid\" data-ng-click=\"openSharebox()\" data-ng-model=\"post.content\"></textarea>\n" +
    "          </div>\n" +
    "          <button type=\"button\" class=\"btn btn-primary\">Submit</button>\n" +
    "          <input name=\"creator_id\" type=\"hidden\" value=\"{{user.id}}\">\n" +
    "        </form>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('pt-br/angularjs/post/views/sharebox.html',
    "<form action=\"/post\" method=\"POST\" data-ng-submit=\"submit($event,post)\" class=\"sharebox ng-scope ng-pristine ng-valid\">\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "      <label for=\"Post_content\">What is happening?</label>\n" +
    "      <textarea name=\"content\" class=\"form-control post-content ng-pristine ng-valid\" data-ng-click=\"openSharebox()\" data-ng-model=\"post.content\"></textarea>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"attach-options\">\n" +
    "    <span><a class=\"btn btn-xs btn-default\"><i class=\"icon-picture\"></i> Images</a></span>\n" +
    "    <span><a class=\"btn btn-xs btn-default\"><i class=\"icon-bookmark\"></i> Link</a></span>\n" +
    "  </div>\n" +
    "\n" +
    "  <div data-ng-show=\"sharebox.open\" class=\"footer\" style=\"display: block;\">\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <input name=\"toIds\" class=\"form-control\" type=\"text\" value=\"\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "      <button type=\"submit\" class=\"btn btn-primary\">\n" +
    "        <span class=\"glyphicon glyphicon-ok\"></span> Share\n" +
    "      </button>\n" +
    "      <button type=\"button\" data-ng-click=\"closeSharebox()\" class=\"btn btn-default cancel\">Cancel</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>"
  );


  $templateCache.put('pt-br/angularjs/site/views/error404.html',
    "Page Not Found - Error 404"
  );


  $templateCache.put('pt-br/angularjs/site/views/highlighted.html',
    "<div ng-show=\"aboutShow\">\n" +
    "  <div ng-include=\" '/angularjs/site/views/home-about-site.html' \"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('pt-br/angularjs/site/views/home-about-site.html',
    "\n" +
    "<section role=\"section\" id=\"section-start\" class=\"section-start\">\n" +
    "  <div class=\"container\">\n" +
    "\n" +
    "    <!-- welcome -->\n" +
    "    <aside class=\"welcome\">\n" +
    "      <h1 class=\"title\">We Social</h1>\n" +
    "      <h3 class=\"text\">This is a template for social network. You can found a basic scaffold for start your project based in a front-end framework focused in <span class=\"strong\">reusable components</span> and in a <span class=\"strong\">mobile first</span> principle. <span class=\"strong\">Enjoy.</span></h3>\n" +
    "    </aside>\n" +
    "    <!-- /welcome -->\n" +
    "\n" +
    "    <!-- signup-form -->\n" +
    "    <div data-ui-view=\"signup-form\"></div>\n" +
    "    <!-- /signup-form -->\n" +
    "  </div>\n" +
    "</section>\n"
  );


  $templateCache.put('pt-br/angularjs/site/views/home-logged-in.html',
    ""
  );


  $templateCache.put('pt-br/angularjs/site/views/home.html',
    "<section role=\"section\" id=\"home-main\" class=\"home-main\">\n" +
    "  <div class=\"sharebox-area masonry-brick  content-block\">\n" +
    "    <we-sharebox></we-sharebox>\n" +
    "  </div>\n" +
    "\n" +
    "  <div id=\"posts\" data-ng-controller=\"PostController\" class=\"news\">\n" +
    "    <div data-ng-repeat=\"post in posts\" class=\"masonry-brick content-block post\">\n" +
    "      <we-post-teaser id=\"post-{{post.id}}\" data-post=\"post\"></we-post-teaser>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>\n"
  );


  $templateCache.put('pt-br/angularjs/site/views/sidebar.html',
    "<div class=\"well sidebar-nav\">\n" +
    "  <ul class=\"nav\">\n" +
    "    <li>Menu do usuario</li>\n" +
    "    <li class=\"active\"><a href=\"#\">Link</a></li>\n" +
    "    <li><a href=\"#\">Grupos</a></li>\n" +
    "    <li><a href=\"#\">Contatos</a></li>\n" +
    "  </ul>\n" +
    "</div><!--/.well -->"
  );


  $templateCache.put('pt-br/angularjs/user/views/account.html',
    "view account"
  );


  $templateCache.put('pt-br/angularjs/user/views/forgotPasswordForm.html',
    "<div class=\"col-md-6 col-md-offset-3\">\n" +
    "  <div class=\"forgot-password-area panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Forgot Password</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <form method=\"post\" action=\"\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">@</span>\n" +
    "            <input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"E-mail\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"input-group\">\n" +
    "            <input class=\"form-control btn btn-primary\" type=\"button\" value=\"Submit\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('pt-br/angularjs/user/views/index.html',
    "<div id=\"dynamic-grid-container\" class=\"users \">\n" +
    "  <div data-ng-repeat=\"user in users\" class=\"user user-teaser teaser\">\n" +
    "    <div data-ng-include=\"'/angularjs/user/views/user-teaser.html'\"></div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('pt-br/angularjs/user/views/login-form.html',
    "<!-- form-login -->\n" +
    "<div class=\"form-login\" data-ng-controller=\"LoginCtrl\" data-ng-hide=\"authorized\">\n" +
    "  <form class=\"form-inline\" role=\"form\" name=\"loginForm\" method=\"post\" data-ng-submit=\"login($event)\">\n" +
    "    <div class=\"form-group left\">\n" +
    "      <label class=\"sr-only\">Email address</label>\n" +
    "      <input type=\"email\" class=\"form-control input-sm\" placeholder=\"Enter email\" id=\"email\" name=\"email\" data-ng-model=\"user.email\" required >\n" +
    "\n" +
    "      <div class=\"checkbox\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\" value=\"remember-me\" id=\"remember\" name=\"remember\" data-ng-model=\"user.remember\"> Remember me\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"form-group right\">\n" +
    "      <label class=\"sr-only\">Password</label>\n" +
    "      <input type=\"password\" class=\"form-control input-sm\" placeholder=\"Password\"  id=\"password\" name=\"password\" data-ng-model=\"user.password\">\n" +
    "\n" +
    "      <div class=\"lost-password\">\n" +
    "        <a class=\"link\" href=\"#\">Forgot password?</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button id=\"loginButton\" class=\"btn btn-primary\" type=\"submit\" class=\"btn btn-sm btn-success\">Sign in</button>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<!-- /form-login -->"
  );


  $templateCache.put('pt-br/angularjs/user/views/signup-form.html',
    "<aside class=\"form-signup\">\n" +
    "  <h2 class=\"form-signin-heading\">\n" +
    "    Create account\n" +
    "    <br><small class=\"subtitle\">It’s free and always will be.</small>\n" +
    "  </h2>\n" +
    "\n" +
    "  <form data-ng-controller=\"CreateAccountCtrl\" data-ng-submit=\"submit($event)\" name=\"createAccountForm\" class=\"user-signup-form ng-pristine ng-invalid ng-invalid-required\" method=\"POST\">    \n" +
    "    <!-- input: username -->\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <label for=\"name\" class=\"input-group-addon\">\n" +
    "          <i class=\"fa fa-user fa-lg\"></i>\n" +
    "        </label>\n" +
    "      <input data-ng-model=\"user.name\" id=\"name\" type=\"text\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Pick a username\" autofocus=\"\" name=\"name\" required=\"\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- /input: username -->\n" +
    "    \n" +
    "    <!-- input: email -->\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <label for=\"email\" class=\"input-group-addon\">\n" +
    "          <i class=\"fa fa-envelope fa-lg\"></i>\n" +
    "        </label>\n" +
    "        <input data-ng-model=\"user.email\" id=\"email\" type=\"email\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required ng-valid-email\" placeholder=\"Your email\" name=\"email\" required=\"\">\n" +
    "      </div>\n" +
    "      <div class=\"message\" data-ng-repeat=\"message in user.email.messages\">\n" +
    "        <div class=\"message.type\">{{message.message}}</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- /input: email -->\n" +
    "    \n" +
    "    <!-- input: password -->\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <label for=\"password\" class=\"input-group-addon\">\n" +
    "          <i class=\"fa fa-key fa-lg\"> </i>\n" +
    "        </label>\n" +
    "        <input data-ng-model=\"user.password\" id=\"password\" type=\"password\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Password\" name=\"password\" required=\"\">\n" +
    "\n" +
    "        <!-- input: confirm-password -->\n" +
    "        <label for=\"confirm-password\" class=\"input-group-btn\">\n" +
    "          <i class=\"glyphicon glyphicon-user\"> </i>\n" +
    "        </label>\n" +
    "        <input data-ng-model=\"user.confirmPassword\" id=\"confirm-password\" type=\"password\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Confirm password\" name=\"confirmPassword\" required=\"\">\n" +
    "        <!-- /input: confirm-password -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- /input: password -->\n" +
    "    \n" +
    "    <!-- button -->\n" +
    "    <button class=\"btn btn-lg btn-success btn-block\" type=\"submit\">\n" +
    "      Sign up\n" +
    "      <i class=\"glyphicon glyphicon-chevron-right\"> </i>\n" +
    "    </button>\n" +
    "    <!-- /button -->\n" +
    "\n" +
    "    <div class=\"message\" data-ng-repeat=\"message in messages\">\n" +
    "      <div class=\"message.type\">{{message.message}}</div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "\n" +
    "\n" +
    "  <div class=\"agree-terms\">\n" +
    "    By clicking Sign Up, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use.\n" +
    "  </div>\n" +
    "\n" +
    "</aside>"
  );


  $templateCache.put('pt-br/angularjs/user/views/signup.html',
    "<div class=\"col-lg-6\">\n" +
    "  <h2 class=\"form-signin-heading\">Create a account</h2>\n" +
    "  <form data-ng-controller=\"CreateAccountCtrl\" data-ng-submit=\"submit($event)\" name=\"createAccountForm\" class=\"create-account-form\" method=\"post\">\n" +
    "    <span class=\"error alert alert-dismissable\" data-ng-show=\"createAccountForm.input.$error.required\">Required!</span><br>\n" +
    "\n" +
    "    <li ng-repeat=\"errors in error\">\n" +
    "        <div data-ng-show=\"error != ''\" class=\"alert alert-danger alert-dismissable\">\n" +
    "          <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n" +
    "          <span class=\"data\">{{error}}</span>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group input-group-lg\">\n" +
    "        <label for=\"name\">Name</label>\n" +
    "        <input data-ng-model=\"user.name\" id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Name\" autofocus=\"\" name=\"name\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group input-group-lg\">\n" +
    "        <label for=\"email\">Email</label>\n" +
    "        <input data-ng-model=\"user.email\" id=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email address\" name=\"email\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group input-group-lg\">\n" +
    "        <label for=\"password\">Password</label>\n" +
    "        <input data-ng-model=\"user.password\" id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group input-group-lg\">\n" +
    "        <label for=\"confirm-password\">Confirm password</label>\n" +
    "        <input data-ng-model=\"user.confirmPassword\" id=\"confirm-password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm password\" name=\"confirmPassword\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "      <input class=\"btn btn-lg btn-primary btn-block\" type=\"submit\" value=\"Sign in\">\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"col-lg-6\">\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('pt-br/angularjs/user/views/user-menu.html',
    "<ul class=\"nav navbar-nav navbar-right\" ng-show=\"user.authorized\">\n" +
    "  <li>\n" +
    "    <a href=\"#\" class=\"dropdown-toggle user-menu-link\" data-toggle=\"dropdown\">\n" +
    "      <span class=\"avatar-small\">\n" +
    "        <avatar user-id=\"{{user.id}}\"></avatar>\n" +
    "      </span>\n" +
    "      <span class=\"user-name\" data-ng-bind=\"user.name\">{{user.name}}</span><b class=\"caret\"></b>\n" +
    "    </a>\n" +
    "    <ul class=\"dropdown-menu\">\n" +
    "      <li data-ng-controller=\"AvatarModalController\">\n" +
    "        <a data-ng-click=\"openModal()\" href=\"#ChangeAvatarModal\">Change Avatar</a>\n" +
    "      </li>\n" +
    "      <li class=\"divider\"></li>\n" +
    "      <li><a href=\"/users/{{user.id}}\">View account</a></li>\n" +
    "      <li><a href=\"/users/{{user.id}}/edit/\">Edit account</a></li>\n" +
    "      <li class=\"divider\"></li>\n" +
    "      <li><a href=\"/users/logout\">Sing out</a></li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "</ul>"
  );


  $templateCache.put('pt-br/angularjs/user/views/user-teaser.html',
    "<div class=\"header\">\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"content\">\n" +
    "\n" +
    "  <h3><a href=\"/users/{{user.id}}\">\n" +
    "    {{user.name}}\n" +
    "  </a>\n" +
    "  </h3>\n" +
    "  <avatar data-avatar-link=\"/users/{{user.id}}\" data-avatar-size=\"medium\" user-id=\"user.id\"></avatar>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"footer ng-scope\">\n" +
    "    <div class=\"actions\">\n" +
    "      <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-plus\"></span> Add in contacts\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "            <span class=\"glyphicon glyphicon-plus\"></span> Follow\n" +
    "      </button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('pt-br/angularjs/user/views/user.html',
    "\n" +
    "<div class=\"user-full\">\n" +
    "  <div class=\"header\">\n" +
    "    <h1 class=\"user-name\">{{user.name}}</h1>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"user-area-data row\">\n" +
    "      <div class=\"user-area-data-left col-md-4\" >\n" +
    "        <span data-avatar-size=\"medium\" user-id=\"user.id\"></span>\n" +
    "      </div>\n" +
    "      <div class=\"user-area-data-rigth col-md-6\">\n" +
    "        <div class=\"user-bio\">\n" +
    "          Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.\n" +
    "\n" +
    "          Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"user-area-seccond-row row\">\n" +
    "      <div class=\"user-area-sidebar col-md-3\">\n" +
    "        adicionar os blocos aqui ...\n" +
    "      </div>\n" +
    "      <div class=\"user-area-activities col-md-7\">\n" +
    "      <h3>Time line</h3>\n" +
    "      .... adicionar as atividades do usuário atual aqui ...\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "      <div class=\"user-bio-text\">{{user.bio}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"footer\">\n" +
    "    <div class=\"actions\">\n" +
    "        <span class=\"social pull-left\">\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-plus\"></span> Add in contacts\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\">\n" +
    "                <span class=\"glyphicon glyphicon-plus\"></span> Follow\n" +
    "          </button>\n" +
    "        </span>\n" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\">\n" +
    "          <span class=\"glyphicon glyphicon-edit\"></span> Edit\n" +
    "        </button>\n" +
    "        <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($index,$event)\">\n" +
    "          <span class=\"glyphicon glyphicon-remove\"></span> Delete\n" +
    "        </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );

}]);
