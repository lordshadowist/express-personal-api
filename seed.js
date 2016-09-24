// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var bbt = new db.Show(
{
	title: "The Big Bang Theory",
	station: "CBS",
	season: 10
});

bbt.save();


// db.Show.create(newShows, function(err, shows){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("created", shows.length, "shows")
//   process.exit(); // we're all done! Exit the program.
// });
