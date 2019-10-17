const cluster = require('cluster');
const morgan = require('morgan');
const Worker = require('webworker-threads').Worker;

// Im a child, Im going to act like a server
// and do nothing else
const crypto = require('crypto');
const express = require('express');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    const worker = new Worker(function() {
        let counter = 0;
        // 1e9 = 1,000,000,000
        while (counter < 1e9) {
            ++counter;
        }
        this.onmessage = function() {
            postMessage(counter);
        };
    });
    worker.onmessage = function(myCounter) {
        console.log('mycounter', myCounter)
        res.send('Que nota soy un thread');
    };

    worker.postMessage();
});
app.get('/fast', (req, res) => {
    res.send('This was fast');
});
app.listen(3000, () => {
    console.log('Server started.');
});

console.log('isMaster', cluster.isMaster);
/**
 How to start pm2 with all cores
 pm2 start file.js -i 0

 **/
