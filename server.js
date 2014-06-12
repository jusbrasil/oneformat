var express = require('express'),
    parser = require('./modules/parser/wysihtml5'),
    bodyParser = require('body-parser'),
    promise = require('promise');

var app = express(); 

app.use(bodyParser());
app.listen(8888);

app.get('/format', function(req, res, next){
    var promises = [];
    for(var key in req.body.html){
        promises = promises.concat(new promise(resolver(key, req.body.html[key])));
    }

    promise.all(promises).then(function(result){
        res.send(result);
    });
});

var resolver = function(key, item){
    return function(resolve, reject){
        var response = {};
        parser.parse(item, function(result, err){
            if(!err){
                response[key] = result;
            } else {
                response[key] = err;
            }
            resolve(response);
        });
    };
};

