
define(function () {

  var wejs = {};
  wejs.config = {
    locale: 'pt-br',
    applicationUrl: '/angularjs/',
    templateUrl: '/templates/wejs/pt-br/angularjs/'
  }

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
