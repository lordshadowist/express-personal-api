// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var newShows = [{title: "The Big Bang Theory", season: 10}];

db.Show.create(newShows, function(err, shows){
  if (err){
    return console.log("Error:", err);
  }

  console.log("created", shows.length, "shows")
  process.exit(); // we're all done! Exit the program.
});
