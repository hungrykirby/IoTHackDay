var util = require('util');
var twitter = require('twitter');
var fs = require('fs');
var osc = require('node-osc');
//var oscclient = new osc.Client('172.28.193.132', 3333); //mine
var oscclient = new osc.Client('172.28.193.94', 2461); //nishimu
//var oscclient = new osc.Client("172.28.193.169", 2461); //yamada
//var require = require('require');
//var iconv = require('iconv');

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
    //console.log("???!");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('index.html'));
  }else if('/js/timeline.js' == url){
    //console.log("jsFileInput");
    fs.readFile('./js/timeline.js', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }/*else if('/js/scroll.js' == url){
    console.log("scrollFileInput");
    fs.readFile('./js/timeline.js', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }*/
}).listen(3000);

var io = require('socket.io').listen(app);

twit.stream('statuses/filter', {'track': '#IoT_Hack'}, function(stream) {
//twit.stream('statuses/sample', function(stream){
  //console.log("????");
  stream.on('data', function (data) {
    //var tweet = '';
    try{
      io.sockets.emit('tweet', data);
      console.log(data.text);
      //oscclient.send('/fromNode', data.text);
      oscclient.send('/letter', data.text);
    }catch(e){
      console.log(e.message);
    }
  });
});

/*setInterval(function(){
  hogehoge();
},1000)
var hogehoge = function(){
  console.log("aaa");
  oscclient.send('/letter', "aaaa");
}*/

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
