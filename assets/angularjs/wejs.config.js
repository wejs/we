
define(function () {

  var wejs = {};
  wejs.config = {
    locale: 'pt-br',
    applicationUrl: '/angularjs/',
    templateUrl: '/templates/wejs/pt-br/angularjs/'
  }

  wejs.config.regions = {};
  wejs.config.regions.sidebar = [];

  var newsWidget = {
    type: 'we-news'
  }

  var menuWidget = {
    type: 'we-menu',
    scopeData: new Array(
      {
        name: 'title',
        value: 'Menu de usuário'
      },
      { name: 'links',
        value: [
          {
            title: 'Lista de contatos',
            url: '/users',
            content: 'Contatos'
          }

        ]
      }
    )
  }

  wejs.config.regions.sidebar.push(menuWidget);
  wejs.config.regions.sidebar.push(newsWidget);


  /**
   * Get template url for angularjs templates
   * @param  {string} defaultUrlString default url string
   * @return {string}                  custom template like localized template
   */
  wejs.getTemplateUrl = function(defaultUrlString){
    return this.config.templateUrl+defaultUrlString;
  }

  window['wejs'] = wejs;

  return wejs;
});
