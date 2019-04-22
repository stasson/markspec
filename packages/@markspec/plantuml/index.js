const { spawnSync } = require("child_process");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = {
  execSync,
  toUriSync
};

const commandLine = (...args) => [
  "-Djava.awt.headless=true",
  "-jar",
  __dirname + "/plantuml.jar",
  "-p",
  "-charset",
  "utf8",
  ...args
];

function execSync(input, type = "png") {
  args = type ? [`-t${type}`] : [];
  options = input ? { input } : {};
  const { stdout } = spawnSync("java", commandLine(args), options);
  return stdout;
}

function toUriSync(input, type = "png") {
  const stdout = execSync(input, type);
  if (type == "svg") {
    const svg = removeSvgComments(stdout.toString());
    return svgToMiniDataURI(svg);
  } else {
    const base64 = stdout.toString("base64");
    return "data:image/png;base64," + base64;
  }
}

function removeSvgComments(svg) {
  return svg.replace(/<!--.*?-->/gs, "");
}

