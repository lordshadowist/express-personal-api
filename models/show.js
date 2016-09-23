var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var tvShowSchema = new Schema
({
	title: String,
	station: String,
	season: Int, // season am on right now
	description: String,
	status: String,
});

var Show = mongoose.model('Show', tvShowSchema);

module.exports = Show;