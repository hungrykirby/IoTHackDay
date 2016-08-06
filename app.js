var util = require('util');
var twitter = require('twitter');
var fs = require('fs');

var twit = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.OAUTH_TOKEN,
  access_token_secret: process.env.OAUTH_TOKEN_SECRET
});

var app = require('http').createServer(function(req, res){
  //console.log("...");
  var url = req.url;
  if('/' == url){
    console.log("???!");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('index.html'));
  }else if('/js/timeline.js' == url){
    console.log("jsFileInput");
    fs.readFile('./js/timeline.js', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }
}).listen(3000);

var io = require('socket.io').listen(app);

twit.stream('statuses/filter', {'track': '#あなたは超高校級のーー'}, function(stream) {
//twit.stream('statuses/sample', function(stream){
  //console.log("????");
  stream.on('data', function (data) {
    //var tweet = '';
    try{
      io.sockets.emit('tweet', data);
      console.log(data.text);
    }catch(e){
      console.log(e.message);
    }
  });
});

//データを受信する
io.sockets.on('connection', function(socket) {
  /*socket.on('msg', function(data) {
    //io.sockets.emit('msg', data);
    console.log(data);
    if(data !== ''){
      twit.post('statuses/update', {status: data + ' #helloFromNode!'}, function(error, tweet, response) {
        if (!error) {
            //console.log(tweet)
        }
      });
    }
  });*/
});
