var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var tvShowSchema = new Schema
({
	//_id: Number,
	title: String,
	station: String,
	season: Number, // season am on right now
	description: String,
	status: String,
});

var Show = mongoose.model('Show', tvShowSchema);

module.exports = Show;