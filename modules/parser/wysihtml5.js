var path = require("path"),
    wysihtml_path = path.resolve(__dirname, '../../vendor/wysihtml5-0.5.0pre.js'),
    runner_path = path.resolve(__dirname, './wysihtml5/runner.js'),
    titleParser = require('./wysihtml5/titleParser.js'),
    jsdom = require('jsdom');

var parse = function(doc, callback) {
    jsdom.env(
        '<textarea id="textarea"></textarea>',
        [
            wysihtml_path,
            runner_path
        ],
        function(errors, window) {
            var result;

            if (!errors) {
                var element = window.document.createElement('div');

                // Applying html parser and text parser rules
                element.innerHTML = window.editor.config
                    .parser(doc.body, window.editor.config.parserRules);

                // Autolinking
                var text = window.wysihtml5.dom.autoLink(element).innerHTML;

                result = {
                    'body': {
                        'text' : text,
                        'totalImages': countHTMLTags('img', text),
                        'totalLinks': countHTMLTags('a', text),
                        'upperCaseRatio': upperCaseRatio(text),
                        'original': {
                            'totalImages':
                                countHTMLTags('img', doc.body),
                            'totalLinks': countHTMLTags('a', doc.body),
                            'upperCaseRatio': upperCaseRatio(doc.body)
                        }
                    },
                    // Parsing the title
                    'title': {
                        'text' : titleParser.parse(doc.title),
                        'upperCaseRatio': upperCaseRatio(doc.title),
                        'totalHTMLTags' : countHTMLTags('', doc.title)
                    }
                };
            } else {
                console.log('Error parsing document: ', errors);
            }
            // Cleaning memory
            window.close();
            callback(result, errors);
        }
    );
};

var upperCaseRatio = function(text) {
    var match =  text.match(/[A-ZÇÃÁÂÀÉÊÕÓÔÚÛÜ]/g),
        ur = (match && match.length) || 0;
    return ur / text.replace(' ', '').length;
};

var countHTMLTags = function(tagName, text) {
    var match = text.match(new RegExp("<"+tagName+".*?>", 'gi'));
    return (match && match.length) || 0;
};

var toString = function(data) {
   return Buffer.isBuffer(data) ? data.toString('utf8') : data;
};

module.exports.parse = parse;
module.exports.upperCaseRatio = upperCaseRatio;
module.exports.countHTMLTags = countHTMLTags;
