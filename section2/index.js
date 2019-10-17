const cluster = require('cluster');
const morgan = require('morgan');

process.env.UV_THREADPOOL_SIZE = 1;
function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
}
// Is the file being executed in master mode?
if (cluster.isMaster) {
    // If you have real multi thread cores, use this number and you shouldn't use more never
    // Not fork more that he number of physical core that you have
    // Cause index.js to be executed *again* but
    // in slave mode
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {
    // Im a child, Im going to act like a server
    // and do nothing else
    const crypto = require('crypto');
    const express = require('express');
    const app = express();

    app.use(morgan('dev'));

    app.get('/', (req, res) => {
        crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
            res.send('HI there');
        });
    });
    app.get('/fast', (req, res) => {
        res.send('This was fast');
    });
    app.listen(3000, () => {
        console.log('Server started.');
    });
}
console.log('isMaster', cluster.isMaster);
