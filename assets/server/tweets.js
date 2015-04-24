var twit = require('twitter'),
config = require('../../config'),
twitter = new twit({
  consumer_key: process.env.consumer_key || config.consumer_key,
  consumer_secret: process.env.consumer_secret || config.consumer_secret,
  access_token_key: process.env.access_token_key || config.access_token_key,
  access_token_secret: process.env.access_token_secret || config.access_token_secret
}),
express = require('express'),
app = express(),
port = process.env.PORT || 3000;

app.use(express.static('dist'));

var server = app.listen(port, function() {
    app.get('/data', function (req,res) {
        twitter.get('/search/tweets.json',
            { q: '"я одинокий" OR "такой одинокий" OR "я одинок" OR "одинокий" OR "одинокая" OR "такая одинокая" OR "я одинокая" OR "одиночество"',
            count: '60'
        },
        function(error,params,repsonse){
            if(error) return;

            var tweets = params.statuses;
            res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
            res.end(JSON.stringify(tweets));
        });
    });
});

console.log("Server listening on 3000");

