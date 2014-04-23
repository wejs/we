angular.module('we_templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('en/angularjs/admin/views/create_role_form.html',
    "create_role_form.html"
  );


  $templateCache.put('en/angularjs/admin/views/roles.html',
    "roles.html"
  );


  $templateCache.put('en/angularjs/avatar/views/change-avatar-form.html',
    "<form id=\"avatar-upload\" action=\"user/avatar/\" class=\"form-upload-avatar\" name=\"uploadAvatarForm\" method=\"post\" data-file-upload=\"options\" enctype=\"multipart/form-data\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\">Change avatar</h4></div><div class=\"modal-body\"><div class=\"row file-uploader\"><div class=\"col-md-8\"><input type=\"file\" ng-file-select=\"onFileSelect($files)\"></div><div class=\"col-md-4\"><button class=\"btn btn-primary\" type=\"buttom\" data-ng-click=\"submit($event)\">Upload and save</button></div></div><div class=\"file-upload-progress\"><progressbar max=\"max\" value=\"dynamic\" type=\"{{type}}\" class=\"progress-striped {{progressActive}}\"><span data-ng-show=\"progressActive\" style=\"color:black; white-space:nowrap\">{{dynamic}} / {{max}}</span></progressbar></div><div><avatar user-id=\"user.id\" class=\"creator-avatar\"></avatar></div></div><div class=\"modal-footer\"><button type=\"button\" data-ng-click=\"modalClose()\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></form>"
  );


  $templateCache.put('en/angularjs/news/views/news-block.html',
    "<div class=\"news-block\"><div class=\"news-itens itens\"><div id=\"activity-{{activity.id}}\" data-ng-repeat=\"activity in activities\" class=\"new-item activity\"><avatar user-id=\"{{activity.actor.id}}\" class=\"creator-avatar\"></avatar>{{activity.title}}</div></div><div class=\"footer\"></div></div>"
  );


  $templateCache.put('en/angularjs/post/views/index.html',
    "<div id=\"posts\" class=\"posts\"><div class=\"sharebox-area masonry-brick content-block\"><we-sharebox></we-sharebox></div><div data-ng-repeat=\"post in posts\" class=\"masonry-brick content-block post\"><we-post-teaser id=\"post-{{post.id}}\" data-post=\"post\"></we-post-teaser></div></div>"
  );


  $templateCache.put('en/angularjs/post/views/post-teaser.html',
    "<div class=\"post-teaser teaser\"><div class=\"header\"><avatar user-id=\"{{post.creator.id}}\" class=\"creator-avatar\"></avatar><a href=\"/post/{{post.id}}\">{{post.id}}</a><div class=\"creator\"></div></div><div class=\"content\"><div data-ng-hide=\"post.editing\" class=\"post-text\">{{post.text}}</div><form data-ng-show=\"post.editing\" id=\"form-post-{{post.id}}\" class=\"edit-post\"><textarea class=\"post-text\" ng-model=\"post.text\"></textarea><div class=\"actions\"><button type=\"button\" class=\"btn btn-primary\" data-ng-click=\"update()\"><span class=\"glyphicon glyphicon-ok\">Save</span></button> <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"cancelEdit()\"><span class=\"glyphicon glyphicon-remove\">Cancel</span></button></div></form></div><div class=\"footer ng-scope\"><div class=\"actions\"><span class=\"social pull-left\"><button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"up($event)\"><span class=\"glyphicon glyphicon-thumbs-up\"></span></button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"down($event)\"><span class=\"glyphicon glyphicon-thumbs-down\"></span></button></span> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-share-alt\"></span> Share</button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button> <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($event)\"><span class=\"glyphicon glyphicon-remove\"></span> Delete</button></div><div class=\"comments\"></div><div class=\"comment-add\"><img class=\"avatar-small pull-left\" src=\"/imgs/avatars/user-avatar.png\"><div class=\"comment-add-buttom\" role=\"button\">Comentar...</div></div></div></div>"
  );


  $templateCache.put('en/angularjs/post/views/post.html',
    "<div class=\"post full\"><div class=\"header\"><avatar user-id=\"{{post.creator.id}}\" class=\"creator-avatar\"></avatar>{{post.id}}<div class=\"creator\"></div>{{post.id}} {{post.creator_id}}</div><div class=\"content\"><div class=\"post-full\"><div class=\"content\"><div class=\"post-text\">{{post.text}}</div></div></div></div><div class=\"footer ng-scope\"><div class=\"actions\"><span class=\"social pull-left\"><button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"up($event)\"><span class=\"glyphicon glyphicon-thumbs-up\"></span></button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"down($event)\"><span class=\"glyphicon glyphicon-thumbs-down\"></span></button></span> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-share-alt\"></span> Share</button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button> <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($event)\"><span class=\"glyphicon glyphicon-remove\"></span> Delete</button></div><div class=\"comments\"></div><div class=\"comment-add\"><img class=\"avatar-small pull-left\" src=\"/imgs/avatars/user-avatar.png\"><form action=\"/comment\" method=\"POST\" class=\"comment ng-valid\"><div class=\"form-group\"><label for=\"Post_content\">Add a comment</label><textarea name=\"comment\" class=\"form-control comment ng-pristine ng-valid\" data-ng-click=\"openSharebox()\" data-ng-model=\"post.content\"></textarea></div><button type=\"button\" class=\"btn btn-primary\">Submit</button><input name=\"creator_id\" type=\"hidden\" value=\"{{user.id}}\"></form></div></div></div>"
  );


  $templateCache.put('en/angularjs/post/views/sharebox.html',
    "<form action=\"/post\" method=\"POST\" data-ng-submit=\"submit($event,post)\" class=\"sharebox ng-scope ng-pristine ng-valid\"><div class=\"form-group\"><label for=\"Post_content\">What is happening?</label><textarea name=\"content\" class=\"form-control post-content ng-pristine ng-valid\" data-ng-click=\"openSharebox()\" data-ng-model=\"post.content\"></textarea></div><div class=\"attach-options\"><span><a class=\"btn btn-xs btn-default\"><i class=\"icon-picture\"></i> Images</a></span> <span><a class=\"btn btn-xs btn-default\"><i class=\"icon-bookmark\"></i> Link</a></span></div><div data-ng-show=\"sharebox.open\" class=\"footer\" style=\"display: block\"><div class=\"form-group\"><input name=\"toIds\" class=\"form-control\" type=\"text\" value=\"\"></div><div class=\"actions\"><button type=\"submit\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-ok\"></span> Share</button> <button type=\"button\" data-ng-click=\"closeSharebox()\" class=\"btn btn-default cancel\">Cancel</button></div></div></form>"
  );


  $templateCache.put('en/angularjs/site/views/error404.html',
    "Page Not Found - Error 404"
  );


  $templateCache.put('en/angularjs/site/views/highlighted.html',
    "<div ng-show=\"aboutShow\"><div ng-include=\" '/angularjs/site/views/home-about-site.html' \"></div></div>"
  );


  $templateCache.put('en/angularjs/site/views/home-about-site.html',
    "<section role=\"section\" id=\"section-start\" class=\"section-start\"><div class=\"container\"><!-- welcome --><aside class=\"welcome\"><h1 class=\"title\">We Social</h1><h3 class=\"text\">This is a template for social network. You can found a basic scaffold for start your project based in a front-end framework focused in <span class=\"strong\">reusable components</span> and in a <span class=\"strong\">mobile first</span> principle. <span class=\"strong\">Enjoy.</span></h3></aside><!-- /welcome --><!-- signup-form --><div data-ui-view=\"signup-form\"></div><!-- /signup-form --></div></section>"
  );


  $templateCache.put('en/angularjs/site/views/home-logged-in.html',
    ""
  );


  $templateCache.put('en/angularjs/site/views/home.html',
    "<section role=\"section\" id=\"home-main\" class=\"home-main\"><div class=\"sharebox-area masonry-brick content-block\"><we-sharebox></we-sharebox></div><div id=\"posts\" data-ng-controller=\"PostController\" class=\"news\"><div data-ng-repeat=\"post in posts\" class=\"masonry-brick content-block post\"><we-post-teaser id=\"post-{{post.id}}\" data-post=\"post\"></we-post-teaser></div></div></section>"
  );


  $templateCache.put('en/angularjs/site/views/sidebar.html',
    "<div class=\"well sidebar-nav\"><ul class=\"nav\"><li>Menu do usuario</li><li class=\"active\"><a href=\"#\">Link</a></li><li><a href=\"#\">Grupos</a></li><li><a href=\"#\">Contatos</a></li></ul></div><!--/.well -->"
  );


  $templateCache.put('en/angularjs/user/views/account.html',
    "view account"
  );


  $templateCache.put('en/angularjs/user/views/forgotPasswordForm.html',
    "<div class=\"col-md-6 col-md-offset-3\"><div class=\"forgot-password-area panel panel-default\"><div class=\"panel-heading\">Forgot Password</div><div class=\"panel-body\"><form method=\"post\" action=\"\"><div class=\"form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">@</span><input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"E-mail\"></div></div><div class=\"form-group\"><div class=\"input-group\"><input class=\"form-control btn btn-primary\" type=\"button\" value=\"Submit\"></div></div></form></div></div></div>"
  );


  $templateCache.put('en/angularjs/user/views/index.html',
    "<div id=\"dynamic-grid-container\" class=\"users\"><div data-ng-repeat=\"user in users\" class=\"user user-teaser teaser\"><div data-ng-include=\"'/angularjs/user/views/user-teaser.html'\"></div></div></div>"
  );


  $templateCache.put('en/angularjs/user/views/login-form.html',
    "<!-- form-login --><div class=\"form-login\" data-ng-controller=\"LoginCtrl\" data-ng-hide=\"authorized\"><form class=\"form-inline\" role=\"form\" name=\"loginForm\" method=\"post\" data-ng-submit=\"login($event)\"><div class=\"form-group left\"><label class=\"sr-only\">Email address</label><input type=\"email\" class=\"form-control input-sm\" placeholder=\"Enter email\" id=\"email\" name=\"email\" data-ng-model=\"user.email\" required><div class=\"checkbox\"><label><input type=\"checkbox\" value=\"remember-me\" id=\"remember\" name=\"remember\" data-ng-model=\"user.remember\">Remember me</label></div></div><div class=\"form-group right\"><label class=\"sr-only\">Password</label><input type=\"password\" class=\"form-control input-sm\" placeholder=\"Password\" id=\"password\" name=\"password\" data-ng-model=\"user.password\"><div class=\"lost-password\"><a class=\"link\" href=\"#\">Forgot password?</a></div></div><button id=\"loginButton\" class=\"btn btn-primary\" type=\"submit\" class=\"btn btn-sm btn-success\">Sign in</button></form></div><!-- /form-login -->"
  );


  $templateCache.put('en/angularjs/user/views/signup-form.html',
    "<aside class=\"form-signup\"><h2 class=\"form-signin-heading\">Create account<br><small class=\"subtitle\">It’s free and always will be.</small></h2><form data-ng-controller=\"CreateAccountCtrl\" data-ng-submit=\"submit($event)\" name=\"createAccountForm\" class=\"user-signup-form ng-pristine ng-invalid ng-invalid-required\" method=\"POST\"><!-- input: username --><div class=\"form-group\"><div class=\"input-group\"><label for=\"name\" class=\"input-group-addon\"><i class=\"fa fa-user fa-lg\"></i></label><input data-ng-model=\"user.name\" id=\"name\" type=\"text\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Pick a username\" autofocus name=\"name\" required></div></div><!-- /input: username --><!-- input: email --><div class=\"form-group\"><div class=\"input-group\"><label for=\"email\" class=\"input-group-addon\"><i class=\"fa fa-envelope fa-lg\"></i></label><input data-ng-model=\"user.email\" id=\"email\" type=\"email\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required ng-valid-email\" placeholder=\"Your email\" name=\"email\" required></div><div class=\"message\" data-ng-repeat=\"message in user.email.messages\"><div class=\"message.type\">{{message.message}}</div></div></div><!-- /input: email --><!-- input: password --><div class=\"form-group\"><div class=\"input-group\"><label for=\"password\" class=\"input-group-addon\"><i class=\"fa fa-key fa-lg\"></i></label><input data-ng-model=\"user.password\" id=\"password\" type=\"password\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Password\" name=\"password\" required><!-- input: confirm-password --><label for=\"confirm-password\" class=\"input-group-btn\"><i class=\"glyphicon glyphicon-user\"></i></label><input data-ng-model=\"user.confirmPassword\" id=\"confirm-password\" type=\"password\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Confirm password\" name=\"confirmPassword\" required><!-- /input: confirm-password --></div></div><!-- /input: password --><!-- button --><button class=\"btn btn-lg btn-success btn-block\" type=\"submit\">Sign up <i class=\"glyphicon glyphicon-chevron-right\"></i></button> <!-- /button --><div class=\"message\" data-ng-repeat=\"message in messages\"><div class=\"message.type\">{{message.message}}</div></div></form><div class=\"agree-terms\">By clicking Sign Up, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use.</div></aside>"
  );


  $templateCache.put('en/angularjs/user/views/signup.html',
    "<div class=\"col-lg-6\"><h2 class=\"form-signin-heading\">Create a account</h2><form data-ng-controller=\"CreateAccountCtrl\" data-ng-submit=\"submit($event)\" name=\"createAccountForm\" class=\"create-account-form\" method=\"post\"><span class=\"error alert alert-dismissable\" data-ng-show=\"createAccountForm.input.$error.required\">Required!</span><br><li ng-repeat=\"errors in error\"><div data-ng-show=\"error != ''\" class=\"alert alert-danger alert-dismissable\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button> <span class=\"data\">{{error}}</span></div></li><div class=\"form-group\"><div class=\"input-group input-group-lg\"><label for=\"name\">Name</label><input data-ng-model=\"user.name\" id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Name\" autofocus name=\"name\" required></div></div><div class=\"form-group\"><div class=\"input-group input-group-lg\"><label for=\"email\">Email</label><input data-ng-model=\"user.email\" id=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email address\" name=\"email\" required></div></div><div class=\"form-group\"><div class=\"input-group input-group-lg\"><label for=\"password\">Password</label><input data-ng-model=\"user.password\" id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password\" required></div></div><div class=\"form-group\"><div class=\"input-group input-group-lg\"><label for=\"confirm-password\">Confirm password</label><input data-ng-model=\"user.confirmPassword\" id=\"confirm-password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm password\" name=\"confirmPassword\" required></div></div><input class=\"btn btn-lg btn-primary btn-block\" type=\"submit\" value=\"Sign in\"></form></div><div class=\"col-lg-6\"></div>"
  );


  $templateCache.put('en/angularjs/user/views/user-menu.html',
    "<ul class=\"nav navbar-nav navbar-right\" ng-show=\"user.authorized\"><li><a href=\"#\" class=\"dropdown-toggle user-menu-link\" data-toggle=\"dropdown\"><span class=\"avatar-small\"><avatar user-id=\"{{user.id}}\"></avatar></span> <span class=\"user-name\" data-ng-bind=\"user.name\">{{user.name}}</span><b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li data-ng-controller=\"AvatarModalController\"><a data-ng-click=\"openModal()\" href=\"#ChangeAvatarModal\">Change Avatar</a></li><li class=\"divider\"></li><li><a href=\"/users/{{user.id}}\">View account</a></li><li><a href=\"/users/{{user.id}}/edit/\">Edit account</a></li><li class=\"divider\"></li><li><a href=\"/users/logout\">Sing out</a></li></ul></li></ul>"
  );


  $templateCache.put('en/angularjs/user/views/user-teaser.html',
    "<div class=\"header\"></div><div class=\"content\"><h3><a href=\"/users/{{user.id}}\">{{user.name}}</a></h3><avatar data-avatar-link=\"/users/{{user.id}}\" data-avatar-size=\"medium\" user-id=\"user.id\"></avatar></div><div class=\"footer ng-scope\"><div class=\"actions\"><button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-plus\"></span> Add in contacts</button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-plus\"></span> Follow</button></div></div>"
  );


  $templateCache.put('en/angularjs/user/views/user.html',
    "<div class=\"user-full\"><div class=\"header\"><h1 class=\"user-name\">{{user.name}}</h1></div><div class=\"content\"><div class=\"user-area-data row\"><div class=\"user-area-data-left col-md-4\"><span data-avatar-size=\"medium\" user-id=\"user.id\"></span></div><div class=\"user-area-data-rigth col-md-6\"><div class=\"user-bio\">Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.</div></div></div><div class=\"user-area-seccond-row row\"><div class=\"user-area-sidebar col-md-3\">adicionar os blocos aqui ...</div><div class=\"user-area-activities col-md-7\"><h3>Time line</h3>.... adicionar as atividades do usuário atual aqui ...</div></div><div class=\"user-bio-text\">{{user.bio}}</div></div><div class=\"footer\"><div class=\"actions\"><span class=\"social pull-left\"><button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-plus\"></span> Add in contacts</button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-plus\"></span> Follow</button></span> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button> <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($index,$event)\"><span class=\"glyphicon glyphicon-remove\"></span> Delete</button></div></div></div>"
  );


  $templateCache.put('pt-br/angularjs/admin/views/create_role_form.html',
    "create_role_form.html"
  );


  $templateCache.put('pt-br/angularjs/admin/views/roles.html',
    "roles.html"
  );


  $templateCache.put('pt-br/angularjs/avatar/views/change-avatar-form.html',
    "<form id=\"avatar-upload\" action=\"user/avatar/\" class=\"form-upload-avatar\" name=\"uploadAvatarForm\" method=\"post\" data-file-upload=\"options\" enctype=\"multipart/form-data\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\">Change avatar</h4></div><div class=\"modal-body\"><div class=\"row file-uploader\"><div class=\"col-md-8\"><input type=\"file\" ng-file-select=\"onFileSelect($files)\"></div><div class=\"col-md-4\"><button class=\"btn btn-primary\" type=\"buttom\" data-ng-click=\"submit($event)\">Upload and save</button></div></div><div class=\"file-upload-progress\"><progressbar max=\"max\" value=\"dynamic\" type=\"{{type}}\" class=\"progress-striped {{progressActive}}\"><span data-ng-show=\"progressActive\" style=\"color:black; white-space:nowrap\">{{dynamic}} / {{max}}</span></progressbar></div><div><avatar user-id=\"user.id\" class=\"creator-avatar\"></avatar></div></div><div class=\"modal-footer\"><button type=\"button\" data-ng-click=\"modalClose()\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></form>"
  );


  $templateCache.put('pt-br/angularjs/news/views/news-block.html',
    "<div class=\"news-block\"><div class=\"news-itens itens\"><div id=\"activity-{{activity.id}}\" data-ng-repeat=\"activity in activities\" class=\"new-item activity\"><avatar user-id=\"{{activity.actor.id}}\" class=\"creator-avatar\"></avatar>{{activity.title}}</div></div><div class=\"footer\"></div></div>"
  );


  $templateCache.put('pt-br/angularjs/post/views/index.html',
    "<div id=\"posts\" class=\"posts\"><div class=\"sharebox-area masonry-brick content-block\"><we-sharebox></we-sharebox></div><div data-ng-repeat=\"post in posts\" class=\"masonry-brick content-block post\"><we-post-teaser id=\"post-{{post.id}}\" data-post=\"post\"></we-post-teaser></div></div>"
  );


  $templateCache.put('pt-br/angularjs/post/views/post-teaser.html',
    "<div class=\"post-teaser teaser\"><div class=\"header\"><avatar user-id=\"{{post.creator.id}}\" class=\"creator-avatar\"></avatar><a href=\"/post/{{post.id}}\">{{post.id}}</a><div class=\"creator\"></div></div><div class=\"content\"><div data-ng-hide=\"post.editing\" class=\"post-text\">{{post.text}}</div><form data-ng-show=\"post.editing\" id=\"form-post-{{post.id}}\" class=\"edit-post\"><textarea class=\"post-text\" ng-model=\"post.text\"></textarea><div class=\"actions\"><button type=\"button\" class=\"btn btn-primary\" data-ng-click=\"update()\"><span class=\"glyphicon glyphicon-ok\">Save</span></button> <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"cancelEdit()\"><span class=\"glyphicon glyphicon-remove\">Cancel</span></button></div></form></div><div class=\"footer ng-scope\"><div class=\"actions\"><span class=\"social pull-left\"><button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"up($event)\"><span class=\"glyphicon glyphicon-thumbs-up\"></span></button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"down($event)\"><span class=\"glyphicon glyphicon-thumbs-down\"></span></button></span> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-share-alt\"></span> Share</button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button> <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($event)\"><span class=\"glyphicon glyphicon-remove\"></span> Delete</button></div><div class=\"comments\"></div><div class=\"comment-add\"><img class=\"avatar-small pull-left\" src=\"/imgs/avatars/user-avatar.png\"><div class=\"comment-add-buttom\" role=\"button\">Comentar...</div></div></div></div>"
  );


  $templateCache.put('pt-br/angularjs/post/views/post.html',
    "<div class=\"post full\"><div class=\"header\"><avatar user-id=\"{{post.creator.id}}\" class=\"creator-avatar\"></avatar>{{post.id}}<div class=\"creator\"></div>{{post.id}} {{post.creator_id}}</div><div class=\"content\"><div class=\"post-full\"><div class=\"content\"><div class=\"post-text\">{{post.text}}</div></div></div></div><div class=\"footer ng-scope\"><div class=\"actions\"><span class=\"social pull-left\"><button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"up($event)\"><span class=\"glyphicon glyphicon-thumbs-up\"></span></button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"down($event)\"><span class=\"glyphicon glyphicon-thumbs-down\"></span></button></span> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-share-alt\"></span> Share</button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button> <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($event)\"><span class=\"glyphicon glyphicon-remove\"></span> Delete</button></div><div class=\"comments\"></div><div class=\"comment-add\"><img class=\"avatar-small pull-left\" src=\"/imgs/avatars/user-avatar.png\"><form action=\"/comment\" method=\"POST\" class=\"comment ng-valid\"><div class=\"form-group\"><label for=\"Post_content\">Add a comment</label><textarea name=\"comment\" class=\"form-control comment ng-pristine ng-valid\" data-ng-click=\"openSharebox()\" data-ng-model=\"post.content\"></textarea></div><button type=\"button\" class=\"btn btn-primary\">Submit</button><input name=\"creator_id\" type=\"hidden\" value=\"{{user.id}}\"></form></div></div></div>"
  );


  $templateCache.put('pt-br/angularjs/post/views/sharebox.html',
    "<form action=\"/post\" method=\"POST\" data-ng-submit=\"submit($event,post)\" class=\"sharebox ng-scope ng-pristine ng-valid\"><div class=\"form-group\"><label for=\"Post_content\">What is happening?</label><textarea name=\"content\" class=\"form-control post-content ng-pristine ng-valid\" data-ng-click=\"openSharebox()\" data-ng-model=\"post.content\"></textarea></div><div class=\"attach-options\"><span><a class=\"btn btn-xs btn-default\"><i class=\"icon-picture\"></i> Images</a></span> <span><a class=\"btn btn-xs btn-default\"><i class=\"icon-bookmark\"></i> Link</a></span></div><div data-ng-show=\"sharebox.open\" class=\"footer\" style=\"display: block\"><div class=\"form-group\"><input name=\"toIds\" class=\"form-control\" type=\"text\" value=\"\"></div><div class=\"actions\"><button type=\"submit\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-ok\"></span> Share</button> <button type=\"button\" data-ng-click=\"closeSharebox()\" class=\"btn btn-default cancel\">Cancel</button></div></div></form>"
  );


  $templateCache.put('pt-br/angularjs/site/views/error404.html',
    "Page Not Found - Error 404"
  );


  $templateCache.put('pt-br/angularjs/site/views/highlighted.html',
    "<div ng-show=\"aboutShow\"><div ng-include=\" '/angularjs/site/views/home-about-site.html' \"></div></div>"
  );


  $templateCache.put('pt-br/angularjs/site/views/home-about-site.html',
    "<section role=\"section\" id=\"section-start\" class=\"section-start\"><div class=\"container\"><!-- welcome --><aside class=\"welcome\"><h1 class=\"title\">We Social</h1><h3 class=\"text\">This is a template for social network. You can found a basic scaffold for start your project based in a front-end framework focused in <span class=\"strong\">reusable components</span> and in a <span class=\"strong\">mobile first</span> principle. <span class=\"strong\">Enjoy.</span></h3></aside><!-- /welcome --><!-- signup-form --><div data-ui-view=\"signup-form\"></div><!-- /signup-form --></div></section>"
  );


  $templateCache.put('pt-br/angularjs/site/views/home-logged-in.html',
    ""
  );


  $templateCache.put('pt-br/angularjs/site/views/home.html',
    "<section role=\"section\" id=\"home-main\" class=\"home-main\"><div class=\"sharebox-area masonry-brick content-block\"><we-sharebox></we-sharebox></div><div id=\"posts\" data-ng-controller=\"PostController\" class=\"news\"><div data-ng-repeat=\"post in posts\" class=\"masonry-brick content-block post\"><we-post-teaser id=\"post-{{post.id}}\" data-post=\"post\"></we-post-teaser></div></div></section>"
  );


  $templateCache.put('pt-br/angularjs/site/views/sidebar.html',
    "<div class=\"well sidebar-nav\"><ul class=\"nav\"><li>Menu do usuario</li><li class=\"active\"><a href=\"#\">Link</a></li><li><a href=\"#\">Grupos</a></li><li><a href=\"#\">Contatos</a></li></ul></div><!--/.well -->"
  );


  $templateCache.put('pt-br/angularjs/user/views/account.html',
    "view account"
  );


  $templateCache.put('pt-br/angularjs/user/views/forgotPasswordForm.html',
    "<div class=\"col-md-6 col-md-offset-3\"><div class=\"forgot-password-area panel panel-default\"><div class=\"panel-heading\">Forgot Password</div><div class=\"panel-body\"><form method=\"post\" action=\"\"><div class=\"form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">@</span><input type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"E-mail\"></div></div><div class=\"form-group\"><div class=\"input-group\"><input class=\"form-control btn btn-primary\" type=\"button\" value=\"Submit\"></div></div></form></div></div></div>"
  );


  $templateCache.put('pt-br/angularjs/user/views/index.html',
    "<div id=\"dynamic-grid-container\" class=\"users\"><div data-ng-repeat=\"user in users\" class=\"user user-teaser teaser\"><div data-ng-include=\"'/angularjs/user/views/user-teaser.html'\"></div></div></div>"
  );


  $templateCache.put('pt-br/angularjs/user/views/login-form.html',
    "<!-- form-login --><div class=\"form-login\" data-ng-controller=\"LoginCtrl\" data-ng-hide=\"authorized\"><form class=\"form-inline\" role=\"form\" name=\"loginForm\" method=\"post\" data-ng-submit=\"login($event)\"><div class=\"form-group left\"><label class=\"sr-only\">Email address</label><input type=\"email\" class=\"form-control input-sm\" placeholder=\"Enter email\" id=\"email\" name=\"email\" data-ng-model=\"user.email\" required><div class=\"checkbox\"><label><input type=\"checkbox\" value=\"remember-me\" id=\"remember\" name=\"remember\" data-ng-model=\"user.remember\">Remember me</label></div></div><div class=\"form-group right\"><label class=\"sr-only\">Password</label><input type=\"password\" class=\"form-control input-sm\" placeholder=\"Password\" id=\"password\" name=\"password\" data-ng-model=\"user.password\"><div class=\"lost-password\"><a class=\"link\" href=\"#\">Forgot password?</a></div></div><button id=\"loginButton\" class=\"btn btn-primary\" type=\"submit\" class=\"btn btn-sm btn-success\">Sign in</button></form></div><!-- /form-login -->"
  );


  $templateCache.put('pt-br/angularjs/user/views/signup-form.html',
    "<aside class=\"form-signup\"><h2 class=\"form-signin-heading\">Create account<br><small class=\"subtitle\">It’s free and always will be.</small></h2><form data-ng-controller=\"CreateAccountCtrl\" data-ng-submit=\"submit($event)\" name=\"createAccountForm\" class=\"user-signup-form ng-pristine ng-invalid ng-invalid-required\" method=\"POST\"><!-- input: username --><div class=\"form-group\"><div class=\"input-group\"><label for=\"name\" class=\"input-group-addon\"><i class=\"fa fa-user fa-lg\"></i></label><input data-ng-model=\"user.name\" id=\"name\" type=\"text\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Pick a username\" autofocus name=\"name\" required></div></div><!-- /input: username --><!-- input: email --><div class=\"form-group\"><div class=\"input-group\"><label for=\"email\" class=\"input-group-addon\"><i class=\"fa fa-envelope fa-lg\"></i></label><input data-ng-model=\"user.email\" id=\"email\" type=\"email\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required ng-valid-email\" placeholder=\"Your email\" name=\"email\" required></div><div class=\"message\" data-ng-repeat=\"message in user.email.messages\"><div class=\"message.type\">{{message.message}}</div></div></div><!-- /input: email --><!-- input: password --><div class=\"form-group\"><div class=\"input-group\"><label for=\"password\" class=\"input-group-addon\"><i class=\"fa fa-key fa-lg\"></i></label><input data-ng-model=\"user.password\" id=\"password\" type=\"password\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Password\" name=\"password\" required><!-- input: confirm-password --><label for=\"confirm-password\" class=\"input-group-btn\"><i class=\"glyphicon glyphicon-user\"></i></label><input data-ng-model=\"user.confirmPassword\" id=\"confirm-password\" type=\"password\" class=\"form-control input-lg ng-pristine ng-invalid ng-invalid-required\" placeholder=\"Confirm password\" name=\"confirmPassword\" required><!-- /input: confirm-password --></div></div><!-- /input: password --><!-- button --><button class=\"btn btn-lg btn-success btn-block\" type=\"submit\">Sign up <i class=\"glyphicon glyphicon-chevron-right\"></i></button> <!-- /button --><div class=\"message\" data-ng-repeat=\"message in messages\"><div class=\"message.type\">{{message.message}}</div></div></form><div class=\"agree-terms\">By clicking Sign Up, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use.</div></aside>"
  );


  $templateCache.put('pt-br/angularjs/user/views/signup.html',
    "<div class=\"col-lg-6\"><h2 class=\"form-signin-heading\">Create a account</h2><form data-ng-controller=\"CreateAccountCtrl\" data-ng-submit=\"submit($event)\" name=\"createAccountForm\" class=\"create-account-form\" method=\"post\"><span class=\"error alert alert-dismissable\" data-ng-show=\"createAccountForm.input.$error.required\">Required!</span><br><li ng-repeat=\"errors in error\"><div data-ng-show=\"error != ''\" class=\"alert alert-danger alert-dismissable\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button> <span class=\"data\">{{error}}</span></div></li><div class=\"form-group\"><div class=\"input-group input-group-lg\"><label for=\"name\">Name</label><input data-ng-model=\"user.name\" id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Name\" autofocus name=\"name\" required></div></div><div class=\"form-group\"><div class=\"input-group input-group-lg\"><label for=\"email\">Email</label><input data-ng-model=\"user.email\" id=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email address\" name=\"email\" required></div></div><div class=\"form-group\"><div class=\"input-group input-group-lg\"><label for=\"password\">Password</label><input data-ng-model=\"user.password\" id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password\" required></div></div><div class=\"form-group\"><div class=\"input-group input-group-lg\"><label for=\"confirm-password\">Confirm password</label><input data-ng-model=\"user.confirmPassword\" id=\"confirm-password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm password\" name=\"confirmPassword\" required></div></div><input class=\"btn btn-lg btn-primary btn-block\" type=\"submit\" value=\"Sign in\"></form></div><div class=\"col-lg-6\"></div>"
  );


  $templateCache.put('pt-br/angularjs/user/views/user-menu.html',
    "<ul class=\"nav navbar-nav navbar-right\" ng-show=\"user.authorized\"><li><a href=\"#\" class=\"dropdown-toggle user-menu-link\" data-toggle=\"dropdown\"><span class=\"avatar-small\"><avatar user-id=\"{{user.id}}\"></avatar></span> <span class=\"user-name\" data-ng-bind=\"user.name\">{{user.name}}</span><b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li data-ng-controller=\"AvatarModalController\"><a data-ng-click=\"openModal()\" href=\"#ChangeAvatarModal\">Change Avatar</a></li><li class=\"divider\"></li><li><a href=\"/users/{{user.id}}\">View account</a></li><li><a href=\"/users/{{user.id}}/edit/\">Edit account</a></li><li class=\"divider\"></li><li><a href=\"/users/logout\">Sing out</a></li></ul></li></ul>"
  );


  $templateCache.put('pt-br/angularjs/user/views/user-teaser.html',
    "<div class=\"header\"></div><div class=\"content\"><h3><a href=\"/users/{{user.id}}\">{{user.name}}</a></h3><avatar data-avatar-link=\"/users/{{user.id}}\" data-avatar-size=\"medium\" user-id=\"user.id\"></avatar></div><div class=\"footer ng-scope\"><div class=\"actions\"><button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-plus\"></span> Add in contacts</button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-plus\"></span> Follow</button></div></div>"
  );


  $templateCache.put('pt-br/angularjs/user/views/user.html',
    "<div class=\"user-full\"><div class=\"header\"><h1 class=\"user-name\">{{user.name}}</h1></div><div class=\"content\"><div class=\"user-area-data row\"><div class=\"user-area-data-left col-md-4\"><span data-avatar-size=\"medium\" user-id=\"user.id\"></span></div><div class=\"user-area-data-rigth col-md-6\"><div class=\"user-bio\">Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.</div></div></div><div class=\"user-area-seccond-row row\"><div class=\"user-area-sidebar col-md-3\">adicionar os blocos aqui ...</div><div class=\"user-area-activities col-md-7\"><h3>Time line</h3>.... adicionar as atividades do usuário atual aqui ...</div></div><div class=\"user-bio-text\">{{user.bio}}</div></div><div class=\"footer\"><div class=\"actions\"><span class=\"social pull-left\"><button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-plus\"></span> Add in contacts</button> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"share($event)\"><span class=\"glyphicon glyphicon-plus\"></span> Follow</button></span> <button type=\"button\" class=\"btn btn-xs btn-default\" data-ng-click=\"edit($event)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button> <button class=\"btn btn-xs btn-danger\" data-ng-click=\"delete($index,$event)\"><span class=\"glyphicon glyphicon-remove\"></span> Delete</button></div></div></div>"
  );

}]);
