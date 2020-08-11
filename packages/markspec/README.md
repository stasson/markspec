# Markspec

Yet Another Markdown renderer, meant for _technical specification_, with Github/Gitlab Flavored Markdown

- [x] Common Mark
- [x] URL Auto linking
- [x] Frontmatter
- [x] Emoji
- [x] KaTeX Formula
- [x] Mermaid Diagrams
- [x] PlantUML Diagrams
- [x] Footnotes

## Install

```bash
npm i -g markspec
```

## Usage

```bash
Usage:
  $ markspec [...patterns]

Commands:
  [...patterns]  convert markdown to html

For more info, run any command with the `--help` flag:
  $ markspec --help

Options:
  -o, --output-dir <dir>  output directory
  --ignore                patterns to exclude (default: **/node_modules)
  --gitignore             ignore patterns in .gitignore files (default: true)
  -v, --version           Display version number
  -h, --help              Display this message
```
