//Timestamp service implemented in barebone node
var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer( function (req, res ) {
  var rUrl = req.url;
  console.log( rUrl );
  
  //if root display info
  if ( rUrl === '/' ) {
    //res.end("online");
    fs.readFile( 'views/index.html', function( err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
  else//run the service
  {
    //res.end("timehere");
    
    //get date substring
    var dateStr = rUrl.substring(1);
    
    console.log(dateStr);
    
    var vDate = new Date(dateStr);
    
    //month name lookup
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];
  
    //compose date responce
    var retObj = { unix: vDate.getTime().toString()
               , natural:  monthNames[vDate.getMonth()] + ' ' + vDate.getDate() + ', ' + vDate.getFullYear() }
    
    //is date valid?
    if ( retObj.unix === 'NaN' )
    {
      retObj.unix = null;
      retObj.natural = null;
    }
  
    //send out data
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(retObj));
    
  }
  
});

server.listen(process.env.PORT, function (){
  console.log("init port: " + process.env.PORT);
});