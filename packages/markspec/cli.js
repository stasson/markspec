#!/usr/bin/env node

const pkg = require("./package.json");
const cli = require("@officr/cli")(pkg);
const { fs, path, glob } = require("@officr/commons");
const { lib } = require("markdown-it/lib/common/utils");
const render = require('./lib/render')

cli.logger.config({ console: true, exitCode: true });

cli
  .command("[...patterns]", "convert markdown to html")
  .option("-o, --output-dir <dir>", "output directory")
  .option("--ignore", "patterns to exclude", {
    default: ["**/node_modules"],
    type: [],
  })
  .action(async (patterns, options) => {
    // process args and apply config
    if (!patterns.length) patterns = ["**.md"];
    options = await config(options);
    const paths = await inputs(patterns, options);
    cli.debug({ patterns, options, paths });

    if (!paths.length) {
      // file not found
      cli.warn("no file found!");
    } else {
      for (filePath of paths) {
        // file found
        cli.info(`processing ${filePath}...`);

        text = await fs.readFile(filePath, "utf8");
        html = await render(text);
        await save(html, filePath, options);
      }
      cli.success();
    }
  });

cli.run();

async function config(options) {
  delete options["--"];
  return options;
}

async function inputs(patterns, options) {
  return glob(patterns, {
    ignore: options.ignore
  });
}

async function save(html, sourcePath, options) {
  const { outputDir } = options;

  var { dir, name } = path.parse(sourcePath);
  if (name.toUpperCase() == "README") {
    name = "index";
  }

  if (outputDir) {
    dir = path.join(outputDir, dir);
    await fs.mkdirp(dir);
  }

  const outPath = path.format({ dir, name, ext: ".html" });
  cli.info(`saving ${outPath}`);
  return fs.writeFile(outPath, html, "utf8");
}

