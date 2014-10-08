var express = require('express'),
    config = require('./config.json'),
    parser = require('./modules/parser/' + config.parser),
    multer  = require('multer'),
    bodyParser = require('body-parser'),
    uuid = require('node-uuid');

var app = express(),
    log = console.log.bind(console, '[' + new Date().toUTCString() + ']');

// parse multipart/form-data
app.use(multer());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.listen(config.port);

log('Started!')

function oneformat(req, res, next) {
    var requestId = uuid.v1();
    log(requestId, 'Received');
    if(!req.body.body) {
        log(requestId, 400, 'Bad request');
        res.status(400).send({
            uuid: requestId,
            message: 'You gotta send me some body to parse'
        });
        return next();
    } else {
        req.body.title = req.body.title || '';
        parser.parse(req.body, function(result, err){
            if (err) {
                log(requestId, 500, 'Parser error');
                res.status(500).send({
                    uuid: requestId,
                    message: 'Can not parser the content'
                });
            } else {
                log(requestId, 200, 'Success');
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
