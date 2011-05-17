var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = mongoose.ObjectId;

//	console.log(Board);
//	console.log(Square);

var Square = new Schema({
	x: Number,
	y: Number,
	lit: Boolean
});

var Board = new Schema({
	board: [[Square]]
});

var Game = new Schema({
	title: String,
	words: [ObjectId],
	boards: [Board]
});

mongoose.model('Game', Game);

var Word = new Schema({
	word: String,
	games: [ObjectId]
});

mongoose.model('Word', Word);

module.exports = {
 	Word: mongoose.model('Word'),
	Game: mongoose.model('Game'),
	connect: function(connStr) {
		mongoose.connect(connStr);
	}
}
	