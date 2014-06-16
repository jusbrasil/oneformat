var express = require('express'),
    parser = require('./modules/parser/wysihtml5'),
    bodyParser = require('body-parser'),
    promise = require('promise');

var app = express(); 

app.use(bodyParser());
app.listen(8888);

app.put('/format', function(req, res, next){
    var promises = [];

    promises = promises.concat(new promise(resolver(req.body.html)));

    promise.all(promises).then(function(result){
        res.send(result[0]);
    });
});

var resolver = function(item){
    return function(resolve, reject){
        parser.parse(item, function(result, err){
            resolve(result);
        });
    };
};

