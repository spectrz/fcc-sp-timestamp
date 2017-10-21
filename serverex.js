//Timestamp service implemented with express

// init project
var express = require('express');
var app = express();

//timestamp service
app.get("/:time", function (request, response) {
  var rDate = request.params.time;
  
  if( rDate === undefined )
  {
      response.end("Timestamp service")
  }
  console.log(rDate);
  
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  
  var time = new Date(rDate);
  
  var retObj = { unix: time.getTime().toString()
               , natural:  monthNames[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear() }
  
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(retObj));
  //response.sendFile(__dirname + '/views/index.html');
});

//default and help page
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


