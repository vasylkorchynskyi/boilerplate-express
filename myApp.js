
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


app.use(express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
    const message = `${req.method} ${req.path} - ${req.ip}`
    console.log(message);
    next();
})

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send(req.time);
});

/** Serve an HTML file */
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
})

/** serve JSON on a specific route */
app.get("/json", function(req, res) {
    if(process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "Hello json".toUpperCase()});
    } else {
        res.json({"message": "Hello json"});
    }
});


/** 9)  Get input from client - Route parameters */


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
