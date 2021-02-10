const Cache = require('@11ty/eleventy-cache-assets');

module.exports = {
  eleventyComputed: {
    media: (data) => {
      if (!data.media) {
        return false;
      }

      return Promise.all(
        data.media.map((item) => {
          const url = new URL(item);
          const oembed = `${url.origin}/oembed?url=${item}`;

          return new Cache(oembed, { duration: '1d', type: 'json' })
            .then(({ html }) => html)
            .catch(() => {
              return `<a href="${item}">${item}</a>`;
            });
        })
      );
    },
  },
};
