var twit = require('twitter'),
twitter = new twit({
    consumer_key: 'JGw7h7COklLIKN23tqNy709Wb',
    consumer_secret: 'Y2UFo3wYPLR7dKvXR8EeyyIW64MooGopP4V432i7saaixhU6GX',
    access_token_key: '2752268208-0nTVj8m9ZnXKlc8cbFDGOeg2GqY2dvcwlT0jM8D',
    access_token_secret: 'D8Hyek382rdLMgTDVklyVIl1L38zoESjJCSkfMpbc1Ssw'
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

