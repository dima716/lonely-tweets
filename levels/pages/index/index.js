var getTweets = require('tweet').getTweets;
var insertTweets = require('tweet').insertTweets;

var content = document.getElementsByClassName("content")[0],
notification = document.getElementsByClassName("notification")[0],
newTweets = [],
tweetId,
initialLaunch = true;

notification.addEventListener("click", onClickNotification, true);

start();
setInterval(start, 15000);

function start () {
  getTweets(function(tweets) {
    content.classList.remove('content_state_loading');

    if (initialLaunch) {
      initialLaunch = false;
      tweetId = tweets[0].id;
      insertTweets(tweets, content);
    } else {
      console.log("tweetId: " + tweetId);
      console.log("tweets[0].id: " + tweets[0].id );
      if(tweets[0].id !== tweetId) {
        for( var i = 0; i < tweets.length; i++) {
          if(tweets[i].id === tweetId) break;
          newTweets.push(tweets[i]);
        }

        tweetId = tweets[0].id;
        notification.innerHTML = newTweets.length + " новых одиноких твитов";
        notification.style.display = "block";
      }
    }
  });
}

function onClickNotification() {
  notification.style.display  = "none";
  insertTweets(newTweets, content);
  newTweets = [];
}
