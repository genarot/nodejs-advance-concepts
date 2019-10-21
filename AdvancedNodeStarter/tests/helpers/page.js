const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: false
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function(target, property) {
                return (
                    customPage[property] || browser[property] || page[property]
                );
            }
        });
    }

    constructor(page) {
        this._page = page;
    }

    async login() {
        const user = await userFactory();
        const { session, sig } = sessionFactory(user);
        await this._page.setCookie({ name: 'session', value: session });
        await this._page.setCookie({ name: 'session.sig', value: sig });
        await this._page.goto('localhost:3000/blogs');
        await this._page.waitFor('a[href="/auth/logout"]');
    }
    async getContentsOf( selector) {
        return this._page.$eval(selector, el => el.innerHTML)
    }
}

module.exports = CustomPage;
