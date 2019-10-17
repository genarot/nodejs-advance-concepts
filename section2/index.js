const cluster = require('cluster');
const morgan = require('morgan');

// Im a child, Im going to act like a server
// and do nothing else
const crypto = require('crypto');
const express = require('express');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('HI there');
    });
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
