const puppeteer = require('puppeteer');

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

    const url = await  page.url();

    expect(url).toMatch(/accounts\.google\.com/)
    console.log('url', url)
});

afterEach(async () => {
    await browser.close();
});
