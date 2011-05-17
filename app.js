require.paths.push('./local_modules');

/**
 * Module dependencies.
 */

var express = require('express')
	, access = require('access')
	, sass = require('sass');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

access.connect('mongodb://localhost:27017/pixelnary');

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
	res.render('index', {title: 'Pixelnary'});
});


app.get('/words', function(req, res){	
	access.Words.find({}, function(err, words) {
		res.render('words/index', {'words': words, 'title': 'words'})
	});
});

app.post('/words', function(req, res){
	var word = new access.Words();
	word.word = req.param('word');
	word.save(function(err){
		if(err) throw err;
		
		res.redirect('/words');
	});
});

var getBoard = function() {
	var board = [];
	for(var y = 0; y < 8; y++) {
		board.push([]);
		for(var x = 0; x < 8; x++) {
			board[y].push({'lit': Math.random() <= .5 , x: x, y: y });
		}
	}
	return board;
};

app.get('/games/:id', function(req, res){
	//pretend we pull a game out of somewhere here
	res.render('games/show', {
		'title': 'That one game with the things',
		'board': getBoard()
	});
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
