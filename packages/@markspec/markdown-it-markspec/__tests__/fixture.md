---
title: Markdown Cheatsheet
version: 1.0
---

# Markdown Cheatsheet

<!-- TOC -->

- [VS Code Config](#vs-code-config)
- [Markdownlint](#markdownlint)
- [Front Matter](#front-matter)
- [Heading](#heading)
- [Horizontal rule](#horizontal-rule)
- [Styling](#styling)
- [Blockquote](#blockquote)
- [Lists](#lists)
- [Links](#links)
- [Code](#code)
- [Tables](#tables)
- [LaTeX Math](#latex-math)
- [PlantUML](#plantuml)
- [Mermaid](#mermaid)
- [Footnotes](#footnotes)

<!-- /TOC -->

## VS Code Config

1. Install [Visual Studio Code](https://code.visualstudio.com/)

2. Install the
   [markdown-gfm-pack](https://marketplace.visualstudio.com/items?itemName=stasson-vscode.markdown-gfm-pack)
   extension.

3. Install the
   [code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
   extension.

4. Configure VS Code

- `.vscode/settings.json`

  ```json
  {
    "markdown-toc.depthFrom": 2,
    "markdown-toc.depthTo": 3,
    "mdmath.delimiters": "gitlab"
  }
  ```

- `.editorconfig`

  ```python
  [*.{md,txt}]
  max_line_length = 80
  indent_style = space
  indent_size = 2
  trim_trailing_whitespace = false
  ```

- `.prettierrc`

  ```json
  {
    "singleQuote": true,
    "semi": false,
    "proseWrap": "always"
  }
  ```

References:

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)

- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

- [markdown-shortcuts](https://marketplace.visualstudio.com/items?itemName=mdickin.markdown-shortcuts)

- [auto-markdown-toc](https://marketplace.visualstudio.com/items?itemName=huntertran.auto-markdown-toc)

- [excel-to-markdown-table](https://marketplace.visualstudio.com/items?itemName=csholmq.excel-to-markdown-table)

- [docs-images](https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-images)

## Markdownlint

```bash
npm install -g markdownlint-cli
```

| Inline config                           | Syntax                                        |
| --------------------------------------- | --------------------------------------------- |
| Disable all rules                       | `<!-- markdownlint-disable -->`               |
| Enable all rules                        | `<!-- markdownlint-enable -->`                |
| Disable one or more rules by name       | `<!-- - markdownlint-disable MD001 MD005 -->` |
| Enable one or more rules by name        | `<!-- markdownlint-enable MD001 MD005 -->`    |
| Capture the current rule configuration  | `<!-- markdownlint-capture -->`               |
| Restore the captured rule configuration | `<!-- markdownlint-restore -->`               |

> see the
> [configuration section](https://github.com/DavidAnson/markdownlint#configuration)
> and the
> [rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) for
> more

## Front Matter

Front matter is metadata included at the beginning of a Markdown document,
preceding its content.

```yaml
---
title: Markdown Cheatsheet
version: 1.0
---

```

## Heading

```markdown
# H1

## H2

### H3

#### H4

##### H5

###### H6
```

## Horizontal rule

```mrkdown
---
```

## Styling

| Style             | Syntax              |
| ----------------- | ------------------- |
| _Italic_          | `_Italic_`          |
| **Bold**          | `**Bold**`          |
| ~~Strikethrough~~ | `~~Strikethrough~~` |

## Blockquote

```markdown
> Blockquotes are very handy to emulate reply text. This line is part of the
> same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh
> boy let's keep writing to make sure this is long enough to actually wrap for
> everyone. Oh, you can _put_ **Markdown** into a blockquote.
```

## Lists

```markdown
- Item
  - Item
    - Item

1. Item 1
2. Item 2
3. Item 3

- [ ] Incomplete item
- [x] Complete item
```

## Links

```markdown
- This is an [inline-style link](https://www.google.com)
- This is a [link to a repository file in the same directory](index.md)
- This is a [relative link to a readme one directory higher](../README.md)
- This is a
  [link that also has title text](https://www.google.com 'This link takes you to Google!')

Using header ID anchors:

- This links to
  [a section on a different Markdown page, using a "#" and the header ID](index.md#overview)
- This links to
  [a different section on the same page, using a "#" and the header ID](#header-ids-and-links)

Using references:

- This is a [reference-style link, see
  below][arbitrary case-insensitive reference text]
- You can [use numbers for reference-style link definitions, see below][1]
- Or leave it empty and use the [link text itself][], see below.

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org/en-US/
[1]: https://slashdot.org
[link text itself]: https://www.reddit.com
```

## Code

Some `` `inline code` ``

````java
```javascript
// An highlighted block
var foo = 'bar'
```
````

## Tables

```markdown
| Item     | Value  |
| -------- | ------ |
| Computer | \$1600 |
| Phone    | \$12   |
| Pipe     | \$1    |
```

| Item     | Value  |
| -------- | ------ |
| Computer | \$1600 |
| Phone    | \$12   |
| Pipe     | \$1    |

```markdown
| Column 1 |      Column 2 |
| :------: | ------------: |
| centered | right-aligned |
```

| Column 1 |      Column 2 |
| :------: | ------------: |
| centered | right-aligned |

## LaTeX Math

```markdown
Some inline maths: $`a^2+b^2=c^2`$
```

Some inline maths: $`a^2+b^2=c^2`$

````
```math
a^2+b^2=c^2
```
````

```math
a^2+b^2=c^2
```

> A great way to get started with [KaTeX](https://katex.org/docs/supported.html)
> is to visit [The KaTeX Demo](https://katex.org/#demo).

## PlantUML

````
```plantuml
Bob -> Alice : hello
Alice -> Bob : hi
```
````

```plantuml
Bob -> Alice : hello
Alice -> Bob : hi
```

> A great way to get started with [PlantUML](https://plantuml.com/) is to visit
> [Plant Text UML Editor](https://www.planttext.com/).

## Mermaid

````
```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```
````

```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

> A great way to get started with
> [Mermaid](https://mermaid-js.github.io/mermaid) is to visit
> [The mermaid live editor](https://mermaidjs.github.io/mermaid-live-editor).

## Footnotes

```markdown
A footnote reference tag looks like this: [^1]

This reference tag is a mix of letters and numbers. [^footnote-42]

[^1]: This is the text inside a footnote.
[^footnote-42]: This is another footnote.
```

A footnote reference tag looks like this: [^1]

This reference tag is a mix of letters and numbers. [^footnote-42]

[^1]: This is the text inside a footnote.
[^footnote-42]: This is another footnote.