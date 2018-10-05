class ScreenshotDiffJestExtension {
  getUsageInfo() {
    return {
      key: "s",
      prompt: "update failing screenshots"
    };
  }
}

module.exports = ScreenshotDiffJestExtension;
