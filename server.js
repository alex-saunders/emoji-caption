const express = require('express');
const path = require('path');

const app = express();

// Define the port to run on
app.set('port', process.env.PORT || 9000);

app.use(express.static(path.join(__dirname, 'docs')));

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Listening on port ' + port);
});