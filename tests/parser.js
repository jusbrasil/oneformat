var assert = require('assert'),
    superagent = require('superagent'),
    wysihtml_parser = require('../modules/parser/wysihtml5');

describe('\'/format\' route POST request test', function(){
    it('Sendind a single html request', function(){


    });

    it('Sending a multiple html request', function(){


    });

    it('Sending an empty request', function(){


    });
});

describe('wysihtml parser test', function(){
    it('Single paragraph', function(done){
        var text = "That's supposed to be a single paragraph";
        wysihtml_parser.parse({
            title: '',
            body : text
        }, function(result, errors){
            assert.equal(result.body.text, '<p>' + text + '</p>');
            done();
        });
    });

    it('Multiple paragraphs', function(done){
        var text = '<p>That\'s one paragraph</p><br/>that\'s another';
        wysihtml_parser.parse({
            title: '',
            body: text
        }, function(result, errors){
            assert.equal(result.body.text, '<p>That\'s one paragraph</p><p>that\'s another</p>');
            done();
        });
    });

    it('Textual correction', function(done){
        var text = 'wrong,punctuation.tots!!!';
        wysihtml_parser.parse({
            title: '',
            body: text
        }, function(result, errors){
            assert.equal(result.body.text, '<p>Wrong, punctuation. Tots!</p>');
            done();
        });
    });

    it('Auto-linking', function(done){
        var text = 'www.google.com';
        wysihtml_parser.parse({
            title: '',
            body: text
        }, function(result, errors){
            assert.equal(result.body.text, '<p><a href="http://www.google.com">www.google.com</a></p>');
            done();
        });
    });

    it('Auto-linking to data-media=embed-video', function(done){
        var text = 'www.youtube.com/embed/nTWSqHi3vUk';
        wysihtml_parser.parse({
            title: '',
            body: text
        }, function(result, errors){
            assert.equal(result.body.text, '<p><a href="http://'+ text +'" data-media="embed-video" width="496px" height="278px">http://'+ text +'</a></p>');
            done();
        });
    });

    it('All upper title', function(done){
        var title = 'A TITLE ALL UPPERCASE';
        wysihtml_parser.parse({
            title: title,
            body: 'whatever'
        }, function(result, errors){
            assert.equal(result.title.text, 'A title all uppercase');
            done();
        });
    });

    it('Title with tags', function(done){
        var title = 'A <span>Title with Tags</span>';
        wysihtml_parser.parse({
            title: title,
            body: 'whatever'
        }, function(result, errors){
            assert.equal(result.title.text, 'A title with tags');
            done();
        });
    });
});

describe('Full text tests', function(){


});
