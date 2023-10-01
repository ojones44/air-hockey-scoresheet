const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
	date: String,
	frances: Number,
	oli: Number,
});

const Result = mongoose.model('Result', resultsSchema);

module.exports = Result;
