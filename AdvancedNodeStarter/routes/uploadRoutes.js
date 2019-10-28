const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
    app.get('/api/upload', requireLogin, async (req, res) => {
        // 'myUserId/a232323.jpeg'
        const key = `${req.user.id}/${uuid()}.jpeg`;
        const url = await s3.getSignedUrlPromise('putObject', {
            Bucket: 'my-blog-bucket-gt',
            ContentType: 'image/jpeg',
            Key: key
        });
        res.status(200)
            .json({
                key,
                url
            })
    });
};
