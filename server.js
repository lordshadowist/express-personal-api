var me = 
{
	name: "Bill Cheng",
	githubLink: "https://github.com/lordshadowist",
	githubProfileImage: "https://avatars1.githubusercontent.com/u/10284294?v=3&s=466",
	personalSiteLink: "https://pure-tundra-89550.herokuapp.com/api/profile",
	currentCity: "Fremont",
	pets: [{name: "Bill", type: "Fish", breed: "guppy", status: "Deceased"}, {name: "Claw", type: "Crab", breed: "unknown", status: "Deceased"}, {name: "BBQ", type: "Bird", breed: "Parakeet", status: "Alive"}]
};

var tempShows = //temp REMOVE l8r
[
	{
		_id:  0,
		title: "Game of Thrones",
		station: "HBO",
		season: 6, // season am on right now
		description: "Multiple families fight to control the land of Westeros",
		status: "Watching",
	},
	{
		_id: 1,
		title: "How I Met Your Mother",
		station: "CBS",
		season: 9, // season am on right now
		description: "Ted Mosby tells the story of how he found the perfect woman",
		status: "Finished",
	},
	{
		_id: 2,
		title: "Riverdale",
		station: "CW",
		season: 1, // season am on right now
		description: "Tv Show of Archie Comics",
		status: "Upcoming",
	}
]

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

// var db = require('./models');

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
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/lordshadowist/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://pure-tundra-89550.herokuapp.com", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/shows", description: "E.g. Shows I'm watching."} // 
    ]
  })
});

app.get('/api/profile', function me_show(req, res)
{
	res.json(me);
})

app.get('/api/shows', function index(req, res) {
  
  res.json({"shows": tempShows});
});

// app.post('/api/todos', function create(req, res) {
//    var newTodo = req.body;
//    newTodo._id = todos[todos.length - 1]._id + 1;
//    todos.push(newTodo);
//    res.json(newTodo);
// });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
