import fs from "fs";
import pixelmatch from "pixelmatch";

// TODO: this should be abstracted by Jest via plugin/extension
const expectedScreenshotPath = __dirname + "/__screenshots__/index.test.js.png";
const actualScreenshotPath =
  __dirname + "/__screenshots__/index.test.js.diff.png";

describe("Index/home route", () => {
  // TODO: this should be abstracted by Jest via plugin/extension
  beforeAll(async () => {
    await page.goto("http://localhost:3000");

    if (!fs.existsSync(expectedScreenshotPath)) {
      await page.screenshot({
        path: expectedScreenshotPath
      });
    }

    await page.screenshot({
      path: actualScreenshotPath
    });
  });

  it("should match previous screenshot", () => {
    // TODO: this should be abstracted by Jest via plugin/extension
    const actualScreenshot = fs.readFileSync(actualScreenshotPath);
    const expectedScreenshot = fs.readFileSync(expectedScreenshotPath);

    // TODO: if done right, this could be something like "expect(page).toMatchScreenshot()"
    const mismatchPixelCount = pixelmatch(
      actualScreenshot,
      expectedScreenshot,
      null,
      800,
      600
    );

    expect(mismatchPixelCount).toEqual(0);
  });

  // TODO: this should be abstracted by Jest via plugin/extension
  afterAll(() => {
    fs.unlinkSync(actualScreenshotPath);
  });
});
