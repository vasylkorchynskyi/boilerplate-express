var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(function(req, res, next) {
    const message = `${req.method} ${req.path} - ${req.ip}`
    console.log(message);
    next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

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

/** time server  */
app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.json({"time": req.time});
});

/** route params  */
app.get("/:word/echo", function(req, res){
    res.json({ "echo": req.params.word })
});

/** get name */
app.get("/name", function(req, res) {
    const name = `${req.query.first} ${req.query.last}`
    res.json({name})
});

/** post name from front page */
app.post("/name", function(req, res) {
    const { first, last } = req.body;
    const name = `${first} ${last}`
    res.json({name})
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
