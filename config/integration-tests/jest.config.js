module.exports = {
  preset: "jest-puppeteer",
  watchPlugins: ["../plugins/jestWatchExtension"],
  testPathIgnorePatterns: ["/unit-tests/"],
  rootDir: "../../pages"
};
