// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var newShow = {title: "The Big Bang Theory", season: 10};

db.Show.create(newShow, function(err, show){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new show", show._id)
  process.exit(); // we're all done! Exit the program.
});
