const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
let browser;
let page;
beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });

    page = await browser.newPage();

    await page.goto('localhost:3000');
});

test('The header has the correct text', async () => {
    await page.screenshot({fullPage: true, path: './my-screen.png'});

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
    console.log('url', url);
});

//.only ignore the rest
test('When signed in, shows logout button', async () => {
    const id = '5da8e2c04aea2c613f64aaaa';

    const {session, sig} = sessionFactory({_id: id});
    console.log(session, sig);
    await page.setCookie({name: 'session', value: session});
    await page.setCookie({name: 'session.sig', value: sig});
    await page.goto('localhost:3000');

    await page.waitFor('a');
    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(text).toEqual('Logout');
});
afterEach(async () => {
    await browser.close();
});
