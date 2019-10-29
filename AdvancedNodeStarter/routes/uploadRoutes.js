const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    signatureVersion: 'v4',
    region: 'us-east-1'
});

module.exports = app => {
    app.get('/api/upload', requireLogin, async (req, res) => {
        s3.listObjects(
            {
                Bucket: 'my-blog-bucket-gt'
            },
            (err, data) => {
                console.log('objects ', data);
            }
        );
        const key = `${req.user.id}/${uuid()}.jpeg`;
        const url = await s3.getSignedUrlPromise('putObject', {
            Bucket: 'my-blog-bucket-gt',
            ContentType: 'image/jpeg',
            Key: key
        });
        res.status(200).json({
            key,
            url
        });
    });
};
