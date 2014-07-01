var express = require('express'),
    config = require('./config.json'),
    parser = require('./modules/parser/' + config.parser),
    promise = require('promise'),
    multiparty = require('multiparty');

var app = express();

app.listen(config.port);

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
