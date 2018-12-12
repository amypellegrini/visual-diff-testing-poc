import jestWatchExtension from "../jestWatchExtension";

describe("Screenshot match testing extension for Jest", () => {
  describe("jestWatchExtension.getUsageInfo", () => {
    test("should not add any option to prompt if tests pass", () => {
      const jestWatchExtensionInstance = new jestWatchExtension();
      const getUsageInfoReturn = jestWatchExtensionInstance.getUsageInfo();
      expect(getUsageInfoReturn).toBeUndefined();
    });
  });
});
