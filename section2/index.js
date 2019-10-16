const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but
    // in slave mode
    cluster.fork();
    cluster.fork();
} else {
    // Im a child, Im going to act like a server
    // and do nothing else
    const express = require('express');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {}
    }

    app.get('/', (req, res) => {
        doWork(5000);
        res.send('HI there');
    });
    app.get('/fast', (req, res) => {
        doWork(5000);
        res.send('This was fast');
    });
    app.listen(3000, () => {
        console.log('Server started.');
    });
}
console.log('isMaster', cluster.isMaster);
