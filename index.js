const express = require('express');
const fetch = require('fetch');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname + '/public/'}));

app.post('/', function(req, res){


    let body = '';
    req.on('data', function(chunk){
        body += chunk.toString();
    });
    req.on('end', function(){
        console.log(body);
        let subreddit = body.split('=')[1];

        fetch.fetchUrl('https://www.reddit.com/r/'+subreddit+'.json', function(err, meta, body){
            if(err){console.error(err);}else{
                res.send(body.toString('utf8'));
            }
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
