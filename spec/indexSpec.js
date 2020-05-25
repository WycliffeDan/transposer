const Browser = require('zombie');
Browser.localhost('example.com', 3000);
describe('the landing page', () => {
  let browser;
  /**
   * This loads the running web application
   * with a new `zombie` browser before each test.
   */
  beforeEach(done => {
    browser = new Browser();

    browser.visit('/', err => {
      if (err) return done.fail(err);
      done();
    });
  });

  /**
   * Your first test!
   *
   * `zombie` has loaded and rendered the page
   * returned by your application. Use `jasmine`
   * and `zombie` to ensure it's doing what you
   * expect.
   *
   * In this case, I just want to make sure a
   * page title is displayed.
   */
  it('displays the page title', () => {
    browser.assert.text('h1', 'transposer');
  });

  /**
   * Put future tests here...
   */

});
