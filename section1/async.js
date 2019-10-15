const https = require('https');

const start = Date.now();

function doRequest() {
    // This requests are delegated to the _os, for that they aren't going to block the thread pool
    // and are gonna be executed simultaneously
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('took ms',Date.now() - start)
        })
    }).end()
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
