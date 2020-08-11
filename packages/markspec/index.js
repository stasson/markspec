const pkg = require("./package.json");
const cli = require("@officr/cli")(pkg);
const { fs, path } = require("@officr/commons");
const globby = require("globby");
const MarkdownIt = require("markdown-it");
const MarkspecPlugin = require("@markspec/markdown-it-markspec");

cli.logger.config({ console: true, exitCode: true });

cli
  .command("[...patterns]", "convert markdown to html")
  .option("-o, --output-dir <dir>", "output directory")
  .option("--ignore", "patterns to exclude", {
    default: ["**/node_modules"],
    type: [],
  })
  .option("--gitignore", "ignore patterns in .gitignore files", {
    default: true,
  })
  .action(async (patterns, options) => {
    // process args and apply config
    if (!patterns.length) patterns = ["."];
    options = await config(options);
    const paths = await glob(patterns, options);
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

async function glob(patterns, options) {
  return globby(patterns, {
    ignore: options.ignore,
    gitignore: options.gitignore,
    expandDirectories: { extensions: ["md"] },
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

async function render(text) {
  md = new MarkdownIt().use(MarkspecPlugin);
  body = md.render(text);

  return `
  <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css" integrity="sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg==" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css" integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ==" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.min.css">
        <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
        <style>
            .markdown-body {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 980px;
                margin: 0 auto;
                padding: 45px;
            }
        
            @media (max-width: 767px) {
                .markdown-body {
                    padding: 15px;
                }
            }
        </style>
    </head>
    <body class="markdown-body">
      ${body}
    </body>
  </html>
  `;
}
