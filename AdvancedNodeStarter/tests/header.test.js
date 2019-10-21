const Page = require('./helpers/page');
// let browser;
let page;
beforeEach(async () => {
    // browser = await puppeteer.launch({
    //     headless: false
    // });

    page = await Page.build();

    await page.goto('localhost:3000');
});

test('The header has the correct text', async done => {
    await page.screenshot({ fullPage: true, path: './my-screen.png' });

    const text = await page.getContentsOf('a.brand-logo');

    expect(text).toEqual('Blogster');
    done();
});

test('clicking login starts oauth flow', async done => {
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
    console.log('url', url);
    done();
});

//.only ignore the rest
test('When signed in, shows logout button', async done => {
    await page.login();

    const text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');
    done();
});

afterEach(async done => {
    await page.close();
    done();
});
