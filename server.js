var express = require('express'),
    parser = require('./modules/parser/wysihtml5'),
    promise = require('promise'),
    multiparty = require('multiparty');

var app = express();

app.listen(8888);

app.put('/format', function(req, res, next){
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        if(err) next(err);
        else {
          parser.parse(fields['html'][0], function(result, err){
            if(err) next(err);
            else {
              res.send(result);
            }
          });
        }
    });
});
