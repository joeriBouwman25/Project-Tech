var createError = require('http-errors');
var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');


//put express application in variable
var app = express();

// setup engine and views koppel hbs engine aan views
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + "/views/layouts/"}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// assign express dependencies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));



// assign routes
app.use('/', indexRouter);




// catch 404 and forward to error handeling
app.use(function(req, res, next){
    next(createError(404));
});

//the error handeling
app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  

});

app.listen(function(){
    console.log("Server is running...");
});
 
module.exports = app;
