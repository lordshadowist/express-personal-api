var me = 
{
	name: "Bill Cheng",
	githubLink: "https://github.com/lordshadowist",
	githubProfileImage: "https://avatars1.githubusercontent.com/u/10284294?v=3&s=466",
	personalSiteLink: "https://pure-tundra-89550.herokuapp.com/api/profile",
	currentCity: "Fremont",
	pets: [{name: "Bill", type: "Fish", breed: "guppy", status: "Deceased"}, {name: "Claw", type: "Crab", breed: "unknown", status: "Deceased"}, {name: "BBQ", type: "Bird", breed: "Parakeet", status: "Alive"}]
};




// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/lordshadowist/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://pure-tundra-89550.herokuapp.com", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, //
      {method: "GET", path: "/api/shows", description: "E.g. Shows I'm watching."},
      {method: "GET", path: "/api/shows/:id", description: "Show with the id that I'm watching"},
      {method: "POST", path: "/api/shows", description: "Post a new show I'm watching"},
      {method: "PUT", path: "/api/shows/:id", description: "Update a show with the id that I'm watching"},
      {method: "DELETE", path: "api/shows/:id", description: "Remove a show with that id that I'm no longer watching"}
    ]
  })
});

app.get('/api/profile', function me_show(req, res)
{
	res.json(me);
})

// TEMP
app.get('/api/shows', function index(req, res)
{
	db.Show.find({}, function(err, shows)
	{
		if(err)
		{
			return console.log("index error: " + err);
		}
		res.json(shows);
	});
});

app.get('/api/shows/:id', function show(req, res) 
{
  // find one showby its id
  var showID = req.params.id;
  console.log(showID);
  // find showin db by id
    db.Show.findOne({ _id: showID }, function(err, foundShow) {
      if (err) { return console.log("show error: " + err);}
      res.json(foundShow);
    });
});

// create new book
app.post('/api/shows', function create(req, res) 
{
  // create new show with form data (`req.body`)
  console.log('Shows create', req.body);
  var newShow = new db.Show(req.body);
  var lastShow = db.Show.find({}, function(err, shows){return shows[shows.length - 1]});
  console.log(lastShow);
  newShow._id = lastShow._id + 1;
  console.log(lastShow._id);
  // save new todo in db
  newShow.save(function(err, savedShow) 
  {
  	if (err) { return console.log("show error: " + err);}
    res.json(savedShow);
  });

});

// update book
app.put('/api/shows/:id', function update(req,res)
{
// get book id from url params (`req.params`)
  console.log('showss update', req.params);
  var showID = req.params.id;
  // find book in db by id
      db.Show.findOne({ _id: bookID }, function(err, foundShow) 
      {
        foundShow = req.body;
        foundShow.save(function(err, savedShow) 
        {
          res.json(savedShow);
        });
        
      });
});

// delete book
app.delete('/api/shows/:id', function destroy(req, res) 
{
  // get book id from url params (`req.params`)
  console.log('shows delete', req.params);
  var showID = req.params.id;
    // find book in db by id
      db.Show.findOneAndRemove({ _id: showID }, function(err, deleteShow) {
        if (err) { return console.log("delete error: " + err);}
        res.json(deleteShow);
      });
});

//Experimental



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
