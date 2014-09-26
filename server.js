var express = require('express'),
    config = require('./config.json'),
    parser = require('./modules/parser/' + config.parser),
    multer  = require('multer'),
    bodyParser = require('body-parser');


var app = express();

// parse multipart/form-data
app.use(multer());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.listen(config.port);

function oneformat(req, res, next) {
    if (!req.body.body) {
        res.status(400).send('You gotta send me some body to parse');
        return next();
    } else {
        req.body.title = req.body.title || '';
        parser.parse(req.body, function(result, err) {
            if (err) next(err);
            else {
                res.send(result);
                return next();
            }
        });
    }
};

app.route('/format')
   .post(oneformat)
   .put(oneformat);
