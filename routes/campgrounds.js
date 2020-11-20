var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// index
router.get("/", function(req, res){
	// Get all the cam,pgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	})
	
}); 

//create
router.post("/",middleware.isLoggedIn, function(req, res){
	var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	var desc=req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground= {name:name, price:price, image:image, description: desc, author: author}
	// create a new campground and save it to DB
	Campground.create(newCampground, function(err, newlycreated){
		if(err){
				console.log(err);
			} else{
				
				// redirect back to campgrounds
				res.redirect("/campgrounds");
			}
	});
});
// new
router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});
//Show
router.get("/:id", function(req, res){
	// find the campground with provided id 
	Campground.findById(req.params.id).populate("comments").exec (function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
		
			// render the show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});

//EDIT Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
		});
	});
		
// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update correct capmground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, {new: true, useFindAndModify: false},              function(err, updatedCampground){
			if(err){
				res.redirect("/campgrounds");
			} else{
				res.redirect("/campgrounds/" + req.params.id);
			}
		});
	});
});

// Destroy ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;