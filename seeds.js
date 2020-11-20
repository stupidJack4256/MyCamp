var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment  = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://dmgupcwbwy0wl.cloudfront.net/system/images/000/379/230/16fd55b3a0043cc2393b2df162710e88/x800gt/New-Year-Camping-Mumbai.jpg?1576258871",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://himalayanhigh.in/Data/Sites/1/media/post-photos/wm/campsites/campsite-1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu34VZ3S7_8RQxD3zn9BNiH9wLVO6PRBAycbwaEVPhiDnvbKyQLQ&s",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]


function seedDB(){
	 //removed all campgrounds
		Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed all files");
		// add some files to database
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else{
					console.log("Added Campground");
					
					// create Comments 
					Comment.create ({
						text: "This place is great, but I wish there was internet",
						author: "Homer"
					}, function(err, comment){
						if(err){
							console.log(err)
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("created new comment");
						}
					});
				}
			});
			
		});
	});
}

module.exports = seedDB;
