//Title Parser
var STR = require('string');

var parse = function(text) {
    return STR(text || '')
      .stripTags()
      .trim()
      .capitalize()
      .s;
};

module.exports.parse = parse;
