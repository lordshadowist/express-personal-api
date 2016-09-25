// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var newShows = [
	{
		_id:  0,
		title: "The Big Bang Theory",
		station: "CBS",
		season: 10, // season am on right now
		description: "Life of Socially Akward Geniuses",
		status: "Watching",
	},
	{
		_id:  1,
		title: "Game of Thrones",
		station: "HBO",
		season: 6, // season am on right now
		description: "Multiple families fight to control the land of Westeros",
		status: "Watching",
	},
	{
		_id: 2,
		title: "How I Met Your Mother",
		station: "CBS",
		season: 9, // season am on right now
		description: "Ted Mosby tells the story of how he found the perfect woman",
		status: "Finished",
	},
	{
		_id: 3,
		title: "Riverdale",
		station: "CW",
		season: 1, // season am on right now
		description: "Tv Show of Archie Comics",
		status: "Upcoming",
	},
	{
		_id:  4,
		title: "The Middle",
		station: "ABC",
		season: 8, // season am on right now
		description: "The Average American Family",
		status: "Watching",
	},
	{
		_id:  5,
		title: "Dr. Ken",
		station: "ABC",
		season: 3, // season am on right now
		description: "Asian Doctor Sitcom",
		status: "Watching",
	},
	{
		_id:  6,
		title: "Community",
		station: "NBC",
		season: 6, // season am on right now
		description: "Friends who go to Greendale Community College",
		status: "Finished",
	}
];


db.Show.remove({}, function(err, books){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all shows');

    // create new records based on the array books_list
    db.Show.create(newShows, function(err, shows){
      if (err) { return console.log('err', err); }
      console.log("created", shows.length, "shows");
      process.exit();
    });
  }
});
