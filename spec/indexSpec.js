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
   * 2020-5-25
   *
   * It looks like all you're missing is an understanding of syntax and CSS selectors.
   *
   * See comments on code below:
   */
  it('displays the transposer icon', () => {

    /**
     * This test fails, because you have selected
     * all images that don't have the class atribute `has-error`.
     *
     * When I cloned the repo, there were no images on the index page at all.
     * As such, the test fails
     *
     * ```
     * AssertionError [ERR_ASSERTION]: Expected 1 elements matching "img:not(.has-error)", found 0
     * ```
     */
    // no idea how to check this ...
    // browser.assert.element("img:not(.has-error)"); // I still have no idea how to do this properly http://zombie.js.org/#assertions


    /**
     * This tests passes, because it's not really doing what you intend.
     * Basically, you are trying to defrerence a property called `require`
     * on a Javascript string type.
     * The string type has no property `require`, so the command `'#icon'.require`
     * returns `undefined`. You are pass `undefined` to the Zombie `assert.element`
     * function which has no effect. No test was executed
     */
     // browser.assert.element('#icon'.require); // no obvious way to test the presence of this element

    /**
     * Same problem as above
     */
    // ?browser.assert.attribute()
    // browser.assert.element('#icon'.src);

    /**
     * It looks to me like you are trying to test for the presence of a logo.
     * When testing interface elements, you need to know about CSS selectors:
     *
     * https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors
     *
     * You can retrieve anything on your web page via selectors like these.
     * It all boils down to _specificity_...
     *
     * This test ensures there's an image on the page. It's not very specific,
     * because the selector (i.e., `img`) selects _every_ image. The assertion itself
     * only expects one image. Your app will likely have many images, so we need
     * to be specific.
     */
    // browser.assert.element('img');

    /**
     * You weren't too far off when you tried to select on `#icon`. An ID attribute
     * is the most specific selector all. There should only ever be one element on your page
     * with a particular ID (kind of like only one car should have a particular license plate).
     * Not, unlike cars, there's nothing to stop you from abusing the expectation of unique IDs
     * on a webpage.
     *
     * This test isn't bad, and it will pass, but it doesn't really describe what you're
     * testing to the casual reader
     */
    // browser.assert.element('#icon');

    /**
     * I think this better, if only because it describes precisely what you are trying to
     * test: i.e., an image with ID attribute `icon`
     */
    browser.assert.element('img#icon');

    /**
     * HTML and CSS are deceptively simple. I doubt anyone could agree on the _correct way_
     * to structure a document and apply styles. I generally favour nesting semantic tags
     * rather than applying CSS classes everywhere. This may change your approach to testing.
     *
     * It looks like you're building a landing page for your app. You may want to organize
     * your logo or `#icon` in a page `header` for example. I don't presume to suggest
     * this is the _only_ way, but hopefully it invites consideration of how to best
     * structure your documents so your CSS doesn't get too hairy.
     *
     */
    browser.assert.element('header img[src="/images/transposer.png"]');
  });

});
