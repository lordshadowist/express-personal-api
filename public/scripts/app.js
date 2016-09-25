console.log("Sanity Check: JS is working!");
var template;
var $showsList;
var allShows = [];
$(document).ready(function()
{
	$showsList = $('#showTarget');

	// compile handlebars template
	var source = $('#shows-template').html();
	template = Handlebars.compile(source);
});
