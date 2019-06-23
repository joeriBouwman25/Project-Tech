// author: Joeri Bouwman
// version: 0.1
// project tech - back end

var express = require('express');
var router = express.Router();
var path = require('path');
// var mongoose = require('mongoose');
// Require MongoClient for connection
var MongoClient = require('mongodb').MongoClient;

var profileSettings;
// Database Url
var url = 'mongodb://localhost:27017/';
// var dbo = db.db("local");
// Try connecting to DB
MongoClient.connect(url, function(err, client){
	if (err) 
		throw err;
	var db = client.db('local');
	console.log(profileSettings);
	console.log("Connected to database: " + url);
	profileSettings = db.collection('profile-settings');
});
	
//var schema = mongoose.Schema;
//var ObjectId = mongoose.Schema.Types.ObjectId;
``// put in another File, require
// 
//var profileSchema = new schema({
//    userID: Number,
//    username: String,
//    image: String,
//    age: Number,
//    gender: Boolean,
//    preferenceMale: Boolean,
//    length: Number,
//    distance: Number,
//    lookingForLove: Boolean,
//    aboutMe: String,
//    minAge: Number,
//    maxAge: Number,
//    pushNotifications: Boolean,
//    city: String,
//    eMail: String
//}, {collection: 'profile-settings'});
//
//var profileSettings = mongoose.model('profileSettings', profileSchema);

//var profileId ='5cff92aee0102f0216d00263';
//// dotenv
//mongoose.connect('mongodb+srv://admin:admin@cluster0-9uslu.mongodb.net/test?retryWrites=true&w=majority', {
//    useNewUrlParser : true
//
//});
//
//mongoose.connection.on('connected', function(){
//    console.log("connected to the database");
//})
//
//mongoose.connection.on('disconnected', function(){
//    console.log("Disconnected from the database");
//});
//
//

// 

// insert test data into database
router.post('/insert', function(req, res){
    var item = {
        username: "Peter",
        image: "/images/profile.jpg",
        age: "1222",
        male: true,
        preferenceMale: false,
        length: 1.82,
        distance: 5,
        lookingForLove: true,
        aboutMe: "looking for fun",
        minAge: 15,
        maxAge: 17,
        pushNotifications: false,
        city: "kingslanding",
        eMail: "peter-dinklage@hotmail.com"
    }
    var data1 = new profileSettings(item);
    data1.save();
    console.log("inserted");
    // res.redirect('/');
});

// local test data
var database = {
    username: "Peter",
    image: "/images/profile.jpg",
    age: "49",
    male: true,
    preferenceMale: false,
    length: 120,
    distance: 5,
    lookingForLove: true,
    aboutMe: "i like short girls",
    minAge: 15,
    maxAge: 17,
    pushNotifications: false,
    city: "kingslanding",
    eMail: "peter-dinklage@hotmail.com"
}

// retrieve data for index page
router.get('/', function(req, res, next){
    res.render('index', {
        username: "Welcome " + req.body.username,
        profileImage: database.image,
        age: database.age,
        aboutMe: database.aboutMe 
    });
});

// retrieve data for profile edit
router.get('/editprofile', function(req, res, next){
    res.render('editprofile', {
        username: database.username,
        age: database.age,
        city: database.city,
        aboutMe: database.aboutMe,
        distance: database.distance,
        length: database.length
        
    });
});

// retrieve data for settings page
router.get('/settings', function(req, res, next){
    profileSettings.findOne({ username: "Peter"})
    .then(function(res){
        res.render('/settings', {
            minAge: res.minAge,
            maxAge: res.maxAge,
            eMail: res.eMail
    
        });
    });

});
// submit editprofile to database
router.post('/edit/submit', function(req, res, next){
    console.log("submitting edit");
    profileSettings.update({username: req.body.username},  {
            username: req.body.username,
            image: "/images/profile.jpg",
            age: req.body.age,
            male: true,
            preferenceMale: false,
            length: req.body.length,
            distance: req.body.distance,
            lookingForLove: true,
            aboutMe: "test",
            minAge: 15,
            maxAge: 17,
            pushNotifications: false,
            city: req.body.city,
            eMail: "peter-conjo@hotmail.com" },
		 {w:1}, function(err, result) {
         if (err) throw err;
		console.log("Entry Updated:" + result)
		res.redirect('/');
    });
});


router.post('/settings/submit', function(req, res, next){
    database.minAge = req.body.minAge;
    database.maxAge = req.body.maxAge;
    if(req.body.genderPref == "male"){
        database.preferenceMale = true;
    }
    else{
        database.preferenceMale = false;
    }
    if(req.body.relation == "relationship"){
        database.lookingForLove = true;
    }
    else{
        database.lookingForLove = false;
    }
    database.eMail = req.body.eMail;
    res.redirect('/settings');
});

module.exports = router;
