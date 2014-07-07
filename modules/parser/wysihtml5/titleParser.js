//Title Parser
var STR = require('string');

var rules = [
      {
        "rule": /\[.*?=.*?\]|\[\/.*?\]/g,
        "replace": ""
      },
      {
        "rule": /^\s+|\s+$|\,$/g,
        "replace": function(txt){return "";}
      },
      {
        "rule": /\s{2,}/g,
        "replace": " "
      },
      {
        "rule": /[\.!?][a-zçáàéèíìóòúùñãõüïâêîôû]/gi,
        "replace": function (txt) {
          return txt[0] + ' ' + txt[1].toUpperCase();
        }
      },
      {
        "rule": /[\.!?][\u00a0\t\ ][a-zçáàéèíìóòúùñãõüïâêîôû]/g,
        "replace": function (txt) {
          return txt.toUpperCase();
        }
      },
      {
        "rule": /\s\,/g,
        "replace": ","
      },
      {
        "rule": /[,]\S/g,
        "replace": function(txt){
          return txt[0] + ' ' + txt[1];
        }
      },
      {
        "rule": /!{2,}/g,
        "replace": "!"
      },
      {
        "rule": /\?{2,}/g,
        "replace": "?"
      },
      {
        "rule": /([!?]([\u00a0\t\ ]+[!?.,:;])+)/g,
        "replace": function (txt) {
          return txt[0];
        }
      },
      {
        "rule": /(!\?|\?!)[!?]+/g,
        "replace": "!?"
      },
      {
        "rule": /\.{4,}/g,
        "replace": '...'
      },
      {
        "rule": /^\.\.\./g,
        "replace": "($&)"
      },
      {
        "rule": /[.!?][\u00a0\t\ ]\S/g,
        "replace": function (txt) {
          return txt.toUpperCase();
        }
      },
      {
        "rule": /[@&*%&#+\-]{2,}/g,
        "replace": function(txt){
          return txt[0];
        }
      },
      {
        "rule": /[,:;][a-zçáàéèíìóòúùñãõüïâêîôû]/g,
        "replace": function(txt){
          return txt[0] + ' ' + txt[1];
        }
      },
      {
        "rule": /\s+[.,;:!?]/g,
        "replace": function(txt){
          return txt[txt.length - 1];
        }
      },
      {
        "rule": /^[a-zçáàéèíìóòúùñãõüïâêîôû]/g,
        "replace": function (txt) {
          return txt.toUpperCase();
        }
      },
      {
        "rule": /\.$/gi,
        "replace": function(txt) {
          return '';
        }
      }
    ];



var parse = function(text) {
    var title =  STR(text || '')
      .stripTags()
      .trim()
      .capitalize()
      .s;

    for(var i in rules){
      title = title.replace(rules[i]['rule'], rules[i]['replace']);
    }

    return title;
};

module.exports.parse = parse;
