import toMatchScreenshot from "../../../plugins/toMatchScreenshot";
import Index from "../../index";

// TODO: this could be abstracted even further via Jest config
expect.extend({ toMatchScreenshot });

describe("Index/home route", () => {
  it("should match previous screenshot", async () => {
    await expect("http://localhost:3000").toMatchScreenshot();
  });
});
