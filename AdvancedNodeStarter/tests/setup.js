jest.setTimeout(5000);
const mongoose = require('mongoose');
const keys = require('../config/keys');
require('../models/User');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

console.log('running the setup file');

const { Page } = require('puppeteer/lib/Page');

// Page.prototype.login = async function() {
//     const user = await userFactory();
//     const { session, sig } = sessionFactory(user);
//
//     await this.setCookie({ name: 'session', value: session });
//     await this.setCookie({ name: 'session.sig', value: sig });
//     await this.goto('localhost:3000');
//
//     await this.waitFor('a[href="/auth/logout"]');
// };
