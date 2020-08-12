const { exec, path, fs } = require("@officr/commons");

async function markspec() {
  const cwd = path.join(__dirname, "..");
  const cli = path.join(__dirname, "..", "cli.js");
  const fixture = path.join(__dirname, "fixture");
  const output = path.join(__dirname, "output");
  return exec.command(`node ${cli} -o ${output} ${fixture}/**.md `, {
    cwd
  });
}

describe("cli", () => {
  it("marskpec", async () => {
    const { exitCode } = await markspec();
    expect(exitCode).toEqual(0);
  });
});
