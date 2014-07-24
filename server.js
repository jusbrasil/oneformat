require('heapdump');
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
        else if(!fields.body) {
            res.status(400).send("You gotta send me some body to parse");
            return next();
        } else {
            fields.body = fields.body[0];
            fields.title = (fields.title && fields.title[0]) || '';
            parser.parse(fields, function(result, err){
                if(err) next(err);
                else {
                    res.send(result);
                    return next();
                }
            });
        }
    });
});
