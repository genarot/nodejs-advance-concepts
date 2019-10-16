const https = require('https');
const crypto = require("crypto");
const fs = require('fs');
process.env.UV_THREADPOOL_SIZE = 1;

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

function doHash() {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
        console.log('Hash:', Date.now() - start);
    });
}
doRequest();


fs.readFile('index.html', 'utf8', (err, data) => {
    console.log('FS:', Date.now() -  start)
})

doHash();
doHash();
doHash();
doHash();
doHash();
