console.log("Sanity Check: JS is working!");
var template;
var $showsList;
var allShows = [];
$(document).ready(function()
{
	$showsList = $('#ShowsTarget');

	// compile handlebars template
	var source = $('#shows-template').html();
	template = Handlebars.compile(source);
	$.ajax(
	{
	    method: 'GET',
	    url: '/api/shows',
	    success: handleSuccess,
	    error: handleError
	});
	$('#newShowForm').on('submit', function(e) 
	{
	    e.preventDefault();
	    $.ajax(
	    {
	      method: 'POST',
	      url: '/api/shows',
	      data: $(this).serialize(),
	      success: newShowSuccess,
	      error: newShowError
	    });
	});
	$showsList.on('click', '.deleteBtn', function() 
	{
	    console.log('clicked delete button to', '/api/shows/'+$(this).attr('data-id'));
	    $.ajax(
	    {
	      method: 'DELETE',
	      url: '/api/shows/'+$(this).attr('data-id'),
	      success: deleteShowSuccess,
	      error: deleteShowError
	    });
	});
});

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $showsList.empty();

  // pass `allShows` into the template function
  var showsHtml = template({ shows: allShows });

  // append html to the view
  $showsList.append(showsHtml);
};

function handleSuccess(json) 
{
  allShows = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#showTarget').text('Failed to load shows, is the server working?');
}

function newShowSuccess(json) {
  $('#newShowForm input').val('');
  allShow.push(json);
  render();
}

function newShowError() {
  console.log('newshow error!');
}

function deleteShowSuccess(json) {
  var show = json;
  console.log(json);
  var showId = show._id;
  console.log('delete show', showId);
  // find the show with the correct ID and remove it from our allshows array
  for(var index = 0; index < allShows.length; index++) {
    if(allShows[index]._id === showId) {
      allShows.splice(index, 1);
      break;  // we found our show - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteShowError() {
  console.log('deleteshow error!');
}
