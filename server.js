var express = require('express'),
    config = require('./config.json'),
    parser = require('./modules/parser/' + config.parser),
    multer  = require('multer'),
    bodyParser = require('body-parser'),
    uuid = require('node-uuid');


var app = express();

// parse multipart/form-data
app.use(multer())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.listen(config.port);

function oneformat(req, res, next){
    var requestId = uuid.v1();
    if(!req.body.body) {
        res.status(400).send({
            uuid: requestId,
            message: 'You gotta send me some body to parse'
        });
        return next();
    } else {
        var fields = req.body;
        if(!fields.title) fields.title = "";
        parser.parse(fields, function(result, err){
            if (err) {
                res.status(500).send({
                    uuid: requestId,
                    message: 'Can not parser the content'
                });
            } else {
                result['uuid'] = requestId;
                res.send(result);
                return next();
            }
        });
    }
};

app.route('/format')
   .post(oneformat)
   .put(oneformat);
