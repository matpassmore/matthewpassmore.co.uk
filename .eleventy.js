// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');

module.exports = function(config) {
  
  //Filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('markdownFilter', markdownFilter);

  // Passthrough copy
  config.addPassthroughCopy('src/images');

  return {
    dir: {
      input: "src",
      output: "dist"
    },
    passthroughFileCopy: true
  }
};
