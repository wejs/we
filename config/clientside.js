
module.exports.clientside = {
  // Plugin load types define load execution order
  plugins: {
    loadTypes: [
      'Core' ,
      'Plugin',
      'Extension'
    ]
  },

  pluginsDefaultEnabled: [
    'weHTTPjQuery',
    'weSocketIO',
    'weI18njs',
    'weMessenger',
    'weEmberPlugin'
  ]

};