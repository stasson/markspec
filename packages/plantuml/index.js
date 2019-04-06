const execa = require("execa");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = {
  toSvg,
  toSvgSync,
  check,
  checkSync,
  toUri,
  toUriSync
};

const commandLine = (...options) => [
  "-Djava.awt.headless=true",
  "-jar",
  __dirname + "/plantuml.jar",
  "-p",
  "-charset",
  "utf8",
  ...options
];

const plantuml = (type, input) => {
  args = type ? [`-t${type}`] : [];
  options = input ? { input } : {};
  return execa("java", commandLine(args), options);
};

const plantumlSync = (type, input) => {
  args = type ? [`-t${type}`] : [];
  options = input ? { input } : {};
  return execa.sync("java", commandLine(args), options);
};

/** throw if syntax errors */
async function check(input) {
  try {
    await execa("java", commandLine(["-syntax"]), { input });
  } catch (e) {
    throw new Error("plantuml syntax error");
  }
}

/** throw if syntax errors */
function checkSync(input) {
  try {
    execa.sync("java", commandLine(["-syntax"]), { input });
  } catch (e) {
    throw new Error("plantuml syntax error");
  }
}

/** spawn plantuml -tsvg */
async function toSvg(input) {
  const { stdout } = await plantuml("svg", input);
  return removeComments(stdout);
}

/** call plantuml -tsvg synchronously */
function toSvgSync(input) {
  const stdout = plantumlSync("svg", input).stdout;
  return removeComments(stdout);
}

function removeComments(svg) {
  return svg.replace(/<!--.*?-->/gs, "");
}

async function toUri(input) {
  const svg = await toSvg(input);
  return svgToMiniDataURI(svg);
}

function toUriSync(input) {
  const svg = toSvgSync(input);
  return svgToMiniDataURI(svg);
}
