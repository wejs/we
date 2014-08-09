/**
 * File upload configs
 * (sails.config.upload)
 *
 */

module.exports.upload = {
  wembedImageFolder: 'files/uploads/wembeds',
  image: {
    avaibleStyles: [
      'mini',
      'thumbnail',
      'medium',
      'large'
    ],

    styles: {
      mini: {
        width: '24',
        heigth: '24'
      },
      thumbnail: {
        width: '75',
        heigth: '75'
      },
      medium: {
        width: '250',
        heigth: '250'
      },
      large: {
        width: '640',
        heigth: '640'
      }
    }
  },

};
