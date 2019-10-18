const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
    await next();

    console.log('ya finalizo', res.statusCode);
    if (!res.statusCode || res.statusCode === 201 || res.statusCode === 200) {
        clearHash(req.user.id);
    }
};
