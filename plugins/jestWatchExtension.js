fs = require("fs");

class ScreenshotDiffJestExtension {
  apply(jestHooks) {
    jestHooks.onTestRunComplete(this.onTestRunComplete.bind(this));
    jestHooks.shouldRunTestSuite(this.shouldRunTestSuite.bind(this));
  }

  shouldRunTestSuite(testPath) {
    return true;
  }

  onTestRunComplete(results) {
    this.testResults = results.testResults;

    if (results.numFailedTests === 0) {
      this.testResults.forEach(testResult =>
        this.clearTempDiffiles(testResult)
      );
    }
  }

  updateScreenshot(test) {
    const pathArray = test.testFilePath.split("/");
    const fileName = pathArray.pop();
    const testsPath = pathArray.join("/") + "/__screenshots__";
    const outdatedScreenshotPath = testsPath + "/" + fileName + ".png";
    const updatedScreenshot = testsPath + "/" + fileName + ".diff.png";

    fs.unlinkSync(outdatedScreenshotPath);
    fs.renameSync(updatedScreenshot, outdatedScreenshotPath);
  }

  clearTempDiffiles(test) {
    const pathArray = test.testFilePath.split("/");
    const fileName = pathArray.pop();
    const testsPath = pathArray.join("/") + "/__screenshots__";
    const diffImage = testsPath + "/" + fileName + ".diff.png";

    fs.unlinkSync(diffImage);
  }

  updateFailingScreenshots() {
    const failingTests = this.testResults.filter((test, index) => {
      return test.numFailingTests > 0;
    });
    const passingTests = this.testResults.filter((test, index) => {
      return test.numPassingTests > 0;
    });

    failingTests.forEach(test => this.updateScreenshot(test));
    passingTests.forEach(test => this.clearTempDiffiles(test));
  }

  run(globalConfig, updateConfigAndRun) {
    this.updateFailingScreenshots();
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  isScreenshotFailedTest(testResult) {
    return (
      testResult.failureMessage &&
      testResult.failureMessage.match("screenshot") !== null
    );
  }

  isFailedDiffTest(testResult) {
    return (
      testResult.numFailingTests > 0 && this.isScreenshotFailedTest(testResult)
    );
  }

  shouldOfferScreenshotUpdate(testResults) {
    for (let i = 0; i < testResults.length; i++) {
      if (this.isFailedDiffTest(testResults[i])) {
        return true;
      }
    }
    return false;
  }

  getUsageInfo(globalConfig) {
    if (
      this.testResults &&
      this.shouldOfferScreenshotUpdate(this.testResults)
    ) {
      return {
        key: "s",
        prompt: "update failing screenshots"
      };
    }
  }
}

module.exports = ScreenshotDiffJestExtension;
