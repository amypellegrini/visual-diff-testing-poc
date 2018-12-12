import toMatchScreenshot from "../../../plugins/toMatchScreenshot";
import Login from "../../login";

// TODO: this could be abstracted even further via Jest config
expect.extend({ toMatchScreenshot });

describe("Other page route", () => {
  it("should match previous screenshot", async () => {
    await expect("http://localhost:3000/login").toMatchScreenshot();
  });
});
