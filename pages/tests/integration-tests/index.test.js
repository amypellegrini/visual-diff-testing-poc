import fs from "fs";
import pixelmatch from "pixelmatch";

const expectedScreenshotPath = __dirname + "/__screenshots__/index.test.js.png";
const actualScreenshotPath =
  __dirname + "/__screenshots__/index.test.js.diff.png";

describe("Index/home route", () => {
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
    const actualScreenshot = fs.readFileSync(actualScreenshotPath);
    const expectedScreenshot = fs.readFileSync(expectedScreenshotPath);

    const mismatchPixelCount = pixelmatch(
      actualScreenshot,
      expectedScreenshot,
      null,
      800,
      600
    );

    expect(mismatchPixelCount).toEqual(0);
  });

  afterAll(() => {
    fs.unlinkSync(actualScreenshotPath);
  });
});
