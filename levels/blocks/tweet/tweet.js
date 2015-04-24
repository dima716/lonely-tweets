function insertTweets(tweets, target) {
  for(var i = 0; i < tweets.length; i++) {
    var tweet = document.createElement("div"),
        tweetMessage = document.createElement("div"),
        tweetAuthor = document.createElement("div");

    tweet.className = "tweet";
    tweetMessage.className = "tweet__message";
    tweetAuthor.className = "tweet__author";

    tweet.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .2)), url(" +
      tweets[i].user.profile_background_image_url + ")";
    tweetMessage.innerHTML = tweets[i].text;
    tweetAuthor.innerHTML = tweets[i].user.name;

    tweet.appendChild(tweetMessage);
    tweet.appendChild(tweetAuthor);

    target.insertBefore(tweet, target.firstChild);
  }
}

function getTweets (callback) {
  var xhr = new XMLHttpRequest(),
      content = document.getElementsByClassName("content")[0];

  content.classList.add('content_state_loading');

  xhr.open("GET", "/data", true);

  xhr.onload = function() {
    if (this.responseText) {
      callback( JSON.parse(this.responseText) );
    }
  }

  xhr.send("");

  xhr.onerror = xhr.onabort = function(err) {
    setTimeout(stream, 500);
  }
}

module.exports = {
  insertTweets: insertTweets,
  getTweets: getTweets
}
