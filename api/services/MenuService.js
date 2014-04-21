exports.getMenu = function(menuMame,req) {
  var menuRendered = '';
  var menu = {};
  var currentUrl = '';
  //console.log(this);
  // TODO add suport to metatags
  var mainMenu = {
    name: 'mainMenu',
    id: 'main-menu',
    links: [
    {
      title: 'Dashboard',
      url: '/dashboard'
    },
    {
      title: 'Users',
      url: '/users'
    }
  ]};

  switch(menuMame)
  {
  case 'userMenu':
    menu = userMenu;
    break;
  default:
    menu = mainMenu;
  }

  menuRendered += '<ul class="nav navbar-nav '+ menu.id +'" >';
  menu.links.forEach(function (link){
    linkClass = '';
    if (req.url == link.url ) linkClass = 'active';

    menuRendered += '<li class="menu-item '+ linkClass +'">';

    menuRendered += '<a href="'+ link.url +'">'+ link.title + '</a>';
    menuRendered += '</li>';
  });
  menuRendered += '<li><a data-toggle="modal" href="#fileManagerModal" >'+req.res.i18n('File Manager') + '</a></li>';

  menuRendered += '</ul>';

  return menuRendered;

};