const ghpages = require('gh-pages');
const { dist } = require('../config/directories');

module.exports = (callback) => {
  ghpages.publish(dist, callback);
};
