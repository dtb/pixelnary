var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = mongoose.ObjectId;
	
var Word = new Schema({
	word: String
//	games: [Game]
});

mongoose.model('Word', Word);

exports.connect = function(connStr) {
	mongoose.connect(connStr);
};

exports.Words = mongoose.model('Word');