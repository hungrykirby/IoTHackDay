$(function() {
  var socket = io.connect();
  var count = 0;
  /*$('#tweetForm').submit(function() {
    console.log("what's in?" + $(':text[name="login_user_tweet"]').val());
    socket.emit('msg', $(':text[name="login_user_tweet"]').val());
    $('input').val('');
    return false;
  });*/

  socket.on('tweet', function(data) { //show tweets
    console.log(count);
    if(data !== undefined && data !== null && data !== ''){
      var tweetImage, userId, username, tweet;
      try{
        tweetImage = data.user.profile_image_url;
        userId = data.user.screen_name;
        username = data.user.name;
        tweet = data.text;
        console.log(tweet);
        tweet = data.text.replace(/#(\w+)/gi, '');
      }catch(e){
        console.log(e.message);
      }
      //console.log("tweet_image_url is " + tweetImage);
      $('.divWrapper').prepend($('<div></div>').addClass('tweetWrapper' + count).addClass(userId).text(""));
      $('.tweetWrapper' + count).prepend($('<div></div>').addClass('tweetContents').text(tweet));
      $('.tweetWrapper' + count).prepend($('<br>'));
      /*$('.tweetWrapper' + count).prepend($('<div class="mdl-layout-spacer"></div>'));
      $('.tweetWrapper' + count).prepend($('<div></div>').addClass('userId').text(userId));
      $('.tweetWrapper' + count).prepend($('<div class="mdl-layout-spacer"></div>'));
      $('.tweetWrapper' + count).prepend($('<div></div>').addClass('username').text(username));
      $('.tweetWrapper' + count).prepend($('<div class="mdl-layout-spacer"></div>'));
      $('.tweetWrapper' + count).prepend($('<img class="twitterImage" scr="">').addClass('twitterIcon' + count));
      $('.twitterIcon' + count).attr('src', tweetImage);*/
    }
    count++;
  });
});

var counter = (function(){
  var n = 0;
  return function(){
    return n++;
  };
})();
