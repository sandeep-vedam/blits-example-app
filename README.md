# Blits L3 Example App

## Getting started

Clone this repository and run `npm install` in the project root.

Then run `npm run dev` to start the dev server and open the URL printed in your terminal to check the App.

This Blits L3 Example App contains a demo of a TMDB integration. Head over to https://developers.themoviedb.org/3/getting-started/introduction to get your own TMDB API key and paste it inside a `.env` file (following the example in `.example.env`). To use your own TMDB API key, you also need to change `VITE_TMDB_BASE_URL` in your `.env` file to `https://api.themoviedb.org/3`.

You can also take a look at the [hosted version](http://blits-demo.lightningjs.io) of this App.

## Visual Regression Test


[BackstopJS](https://github.com/garris/BackstopJS) is a tool that facilitates automated visual regression testing for responsive web user interfaces.
It accomplishes this by comparing DOM screenshots over time.

### Setup

To get started with BackstopJS, follow these steps:

1. Run the App via the command: `npm run start:test` or `NODE_ENV=testing npm run dev`
2. Run `npm test` to test the App against the reference bitmaps.


> Note: To ensure consistency regarding the performance of the app while creating the reference bitmaps or running the tests, `asyncCaptureLimit` should be set to `1` in the `backstop.cjs` file. This will ensure that the tests are run sequentially and not in parallel (so concurrency won't affect the performance of the app).

> Note: The default host and port of the dev server is `http://localhost:5173`. If you are running the app on a different host or port, you should update `TEST_HOST` and `TEST_PORT` in the `.env` file. Or you can directly modify the `backstop.cjs` file.

### Creating Reference Bitmaps

To create reference bitmaps for visual regression testing, use the following command in the terminal:

```bash
npm run test:reference
```

This command will remove any existing reference snapshots and generate new ones based on the provided configuration `URL` in the previous section.


### Creating Test Bitmaps

Generate test bitmaps by using the following command in the terminal:

```bash
$ npm test
```

This command will produce a new set of bitmaps in the `bitmap_test/<timestamp>` folder. After bitmap generation is complete,
a report comparing the most recent bitmaps against the reference will be displayed.


### Browser Options

BackstopJS supports both Puppeteer and Playwright. The existing reference bitmaps were created using Puppeteer with its default browser (Chrome headless). Changing browser settings may change page load and animation timings so after a change reference bitmaps might not match with test bitmaps. In that case, reference bitmaps should be generated again.


If you want to modify browser configuration, use the following settings in your `backstop.cjs` file:

To use webkit:


```json
"engine": "playwright",
"engineOptions": {
    "args": ["--no-sandbox"],
    "browser": "webkit"
},

```

### Debugging

In case you prefer to visually monitor your application's state during the tests, you can enable the debug window using the following setting:

```json
"debugWindow": true
```


## Visual Regression Test using Cypress:

Cypress is a tool that facilitates both functional and visual regression testing for responsive web user interfaces. It accomplishes this by comparing DOM screenshots over time

### Setup

To get started with Cypress, follow these steps:

1. Set the env variable `NODE_ENV=testing` in the .env file
2. Run the App via the command: `npm run start:test`

Headless:
Run `npm run test:cypress` to test the App in headless mode against the reference images located at `cypress-image-diff-screenshots/base` in the root folder of the application.

Without Headless:
Run `npm run test:cypress-headed` to test the App in UI mode against the reference images located at `cypress-image-diff-screenshots/base` in the root folder of the application.


Note: The default host and port of the dev server is http://localhost:5173. If you are running the app on a different host or port, you should update TEST_HOST and TEST_PORT in the .env file.



### Creating Base Screenshots :

Initially no reference screenshots are available. We can take the screen shot using the below code snippet in the test spec wherever required

cy.compareSnapshot({name : '<Name of the screenshot>',  testThreshold: <percentage of difference>})

As already the above snippet is used in our testscript, For the first time, Cypress creates reference images inside the folder cypress-image-diff-screenshots/baseline.

Note: To create new screenshots remove the folder cypress-image-diff-screenshots and run the command for test so that it will create new set of screenshots. In the next run the screenshot comparison will be done.

### Creating Test Screenshots :

After the base Screenshots are created, when we run the command `npm run test:cypress`, again the screenshots are generated inside the cypress-image-diff-screenshots/comparison folder.

The screen shots are compared with the baseline screenshots and if there is any discrepancy, then the difference of the images is captured at cypress-image-diff-screenshots/diff folder

### Report :

The report is generated at the` cypress-image-diff-html-report` folder in the project root folder.


## Bugs or issues?

If you find any bugs or issues, please feel free to file a GitHub issue or open a PR.
