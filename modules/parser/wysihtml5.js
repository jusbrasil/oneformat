var wysihtml_path = "./../../vendor/wysihtml5-0.5.0pre.js",
    runner_path = "./wysihtml5/runner.js",
    titleParser = require('./wysihtml5/titleParser.js');

var jsdom = require('jsdom'),
    fs = require('fs'),
    html = fs.readFileSync("./modules/parser/wysihtml5/base.html", "utf8");

var parse = function(doc, callback){
    var result;
    jsdom.env(
        html,
        [
            wysihtml_path,
            runner_path
        ],
        function(errors, window){
            if(!errors){
                var element = window.document.createElement('div');

                //Applying html parser and text parser rules
                element.innerHTML = window.editor.config
                    .parser(doc.body, window.editor.config.parserRules);
                
                result = {
                    //Autolinking
                    'body': window.wysihtml5.dom
                        .autoLink(element).innerHTML,
                    //Parsing the title
                    'title': titleParser.parse(doc.title)
                };

                //cleaning memory
                window.close();
            } else {
                console.log('Error parsing document:', errors);
            }
            callback(result, errors);
        }
    );
};

var toString = function(data){
   return Buffer.isBuffer(data) ? data.toString('utf8') : data;
};

module.exports.parse = parse;
