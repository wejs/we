/**
 * Wembed  - page embed with wembed
 *
 * @module      :: Model
 * @description :: Wembed model
 *
 */

module.exports = {
  schema: true,
  attributes: {
    // shared page url
    url: {
      type: 'string',
      required: true
    },

    wembedId: {
      type: 'string',
      required: true
    },
    // page domain
    domain: {
      type: 'string',
      required: true
    },
    // time how the page is scaned
    cacheTime: {
      type: 'date',
      required: true
    },

    title: {
      type: 'string'
    },

    description: {
      type: 'string'
    },

    // youtube, vimeo ... wikipedia
    provider: {
      type: 'string'
    },

    pageId: {
      type: 'string'
    },

    pageType: {
      type: 'string'
    },

    imageIndex: {
      type: 'integer',
      defaultsTo: 0
    },

    thumbnail: {
      type: 'string'
    },

    thumbnailMime: {
      type: 'string'
    },

    creator: {
      type: 'string',
      required: true
    }

  }
};
