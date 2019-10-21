const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();

    await page.goto('localhost:3000');
});

afterEach(async () => {
    await page.close();
});

describe('When logged in', function() {
    beforeEach(async () => {
        await page.login();
        await page.click('a.btn-floating');
    });

    test('can see blog create form', async function(done) {
        const label = await page.getContentsOf('form label');
        expect(label).toEqual('Blog Title');
        done();
    });

    describe('And using invalid  inputs', function() {
        beforeEach(async () => {
            await page.click('form button');
        });
        test('the form shows an error message', async function(done) {
            const titleError = await page.getContentsOf('.title .red-text');
            const contentError = await page.getContentsOf('.content .red-text');

            expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');
            done();
        });
    });

    describe('And using valid inputs ', function() {
        beforeEach(async () => {
            await page.type('form .title input', 'My new post');
            await page.type('form .content input', 'My new post content');
            await page.click('form button');
        });
        test('Submitting takes user to review screen', async function(done) {
            const text = await page.getContentsOf('h5');
            expect(text).toEqual('Please confirm your entries');
            done();
        });
        test('Submitting then saving adds blog to index page', async function(assert) {
            await page.click('button .green');
            await page.waitFor('.card');
            const postTitle = await page.getContentsOf('.card-title');
            const postContent = await page.getContentsOf('p');
            expect(postTitle).toEqual('My new post');
            expect(postContent).toEqual('My new post content');
        });
    });

    afterEach(async () => {
        await page.close();
    });
});
