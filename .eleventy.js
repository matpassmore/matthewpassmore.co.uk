// Import plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");


// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');

module.exports = function(config) {

  // Plugins
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginRss);
  
  // Filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('markdownFilter', markdownFilter);

  // Shortcodes
  config.addShortcode("codetitle", function(title, heading = "Filename") {
		return `<div class="c-codetitle"><b>${heading} </b>${title}</div>`;
	});


  // Collections
  config.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/posts/*.md");
  });

  config.addCollection("links", function(collection) {
    return collection.getFilteredByGlob("src/links/*.md");
  });

  config.addCollection("noteTagList", function(collection) {
    let noteTags = new Set();
    collection.getAll().forEach(function(item) {
      if(Array.isArray(item.data["noteTags"])) {
        for(let noteTag of item.data["noteTags"]) {
          noteTags.add(noteTag);
        }
      }
    });
    return Array.from(noteTags).sort();
  });

  config.addCollection("noteTagCollections", function(collection) {
    let resultArrays = {};
    collection.getAll().forEach(function(item) {
      if(Array.isArray(item.data["noteTags"])) {
        for(let noteTag of item.data["noteTags"]) {
          if( !resultArrays[noteTag] ) {
            resultArrays[noteTag] = [];
          }
          resultArrays[noteTag].push(item);
        }
      }
    });
    return resultArrays;
  });

  config.addCollection("linkTagList", function(collection) {
    let linkTags = new Set();
    collection.getAll().forEach(function(item) {
      if(Array.isArray(item.data["linkTags"])) {
        for(let linkTag of item.data["linkTags"]) {
          linkTags.add(linkTag);
        }
      }
    });
    return Array.from(linkTags).sort();
  });

  config.addCollection("linkTagCollections", function(collection) {
    let resultArrays = {};
    collection.getAll().forEach(function(item) {
      if(Array.isArray(item.data["linkTags"])) {
        for(let linkTag of item.data["linkTags"]) {
          if( !resultArrays[linkTag] ) {
            resultArrays[linkTag] = [];
          }
          resultArrays[linkTag].push(item);
        }
      }
    });
    return resultArrays;
  });


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
