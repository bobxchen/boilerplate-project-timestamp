// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  let now = new Date();
  res.json({"unix":now.getTime(), "utc":now.toUTCString()})
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:time", (req,res) => {
  let time = req.params.time;
  if(isNaN(time) ) {
    let timeNumber = new Date(time).getTime();
    console.log(typeof timeNumber);
    let dateStr = new Date(time).toUTCString();
    console.log('dateStr ' +dateStr );
    if(dateStr ===null || dateStr.length ===0 || dateStr =='Invalid Date') {
      res.json({ error : dateStr });
    }else res.json({"unix":timeNumber, "utc":dateStr});
  }else {
    let timeNum = Number(time);
    console.log(timeNum);
    let dateStr = new Date(timeNum).toUTCString();
    res.json({"unix":timeNum, "utc":dateStr});
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
