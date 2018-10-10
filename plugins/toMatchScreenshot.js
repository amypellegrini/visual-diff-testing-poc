import fs from "fs";
import pixelmatch from "pixelmatch";

// This may be exported to a utility module
function getScreenshotFolderPath(module) {
  const path = module.filename.split("/");
  path.pop();
  return path.join("/");
}

// This may be exported to a utility module
function getModuleFileName(module) {
  const path = module.filename.split("/");
  return path.pop();
}

async function toMatchScreenshot(url) {
  const screenshotsPath =
    getScreenshotFolderPath(module.parent) + "/__screenshots__";
  const testFileName = getModuleFileName(module.parent);

  if (!fs.existsSync(screenshotsPath)) {
    fs.mkdirSync(screenshotsPath);
  }

  await page.goto(url);

  const expectedScreenshotPath = screenshotsPath + "/" + testFileName + ".png";
  const actualScreenshotPath =
    screenshotsPath + "/" + testFileName + ".diff.png";

  if (!fs.existsSync(expectedScreenshotPath)) {
    await page.screenshot({
      path: expectedScreenshotPath
    });
  }

  await page.screenshot({
    path: actualScreenshotPath
  });

  const expectedScreenshot = fs.readFileSync(expectedScreenshotPath);
  const actualScreenshot = fs.readFileSync(actualScreenshotPath);

  const mismatchPixelCount = pixelmatch(
    actualScreenshot,
    expectedScreenshot,
    null,
    50,
    50
  );

  const pass = mismatchPixelCount === 0;

  if (pass) {
    return {
      message: () =>
        "received image is a perfect pixel match of current screenshot",
      pass: true
    };
  } else {
    return {
      message: () =>
        `received image is not a perfect pixel match of current screenshot by ${mismatchPixelCount} pixels`,
      pass: false
    };
  }
}

export default toMatchScreenshot;
