var wysihtml_path = "./../../vendor/wysihtml5/dist/wysihtml5-0.5.0pre.js",
    runner_path = "./wysihtml5/runner.js";

var jsdom = require('jsdom'),
    fs = require('fs'),
    html = fs.readFileSync("./modules/parser/wysihtml5/base.html", "utf8");

var parse = function(text, callback){
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
                element.innerHTML = window.editor.config.parser(text, window.editor.config.parserRules);
                result = window.wysihtml5.dom.autoLink(element).innerHTML;
                window.close();
            } else {
                console.log(errors);
                result = false;
            }
            callback(result, errors);
        }
    );
};

var toString = function(data){
   return Buffer.isBuffer(data) ? data.toString('utf8') : data;
};

module.exports.parse = parse;
