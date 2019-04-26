# Markspec

> Under development

[VuePress](https://prismjs.com/)

## Usage

> vuepress@1 plugin

```bash
npm i -D @markspec/vuepress-plugin-preset
```

```javascript {2}
// .vuepress/config.js
module.exports = {
  plugins: ["@markspec/preset"]
};
```

## Footnotes

### Block footnotes

```markdown
Here is a footnote reference,[^1]

[^1]: Here is the footnote.
```

Here is a footnote reference,[^1]

[^1]: Here is the footnote.


### Inline footnotes

```markdown
Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]
```

Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]


## Code block


this is an inline `code` block

```typescript
class Hello {
  message: world;
}
```

```bash
rm -rf .
```

## Uml Diagram (plantuml)

```plantuml
A->B: request
B-->A: ack
```

```ditaa
+--------+   +-------+    +-------+
|        +---+ ditaa +--> |       |
|  Text  |   +-------+    |diagram|
|Document|   |!magic!|    |       |
|     {d}|   |       |    |       |
+---+----+   +-------+    +-------+
	:                         ^
	|       Lots of work      |
	+-------------------------+
```

## Math (katex)

```math
\begin{pmatrix}x\\y\end{pmatrix}
```

## Images

![vue logo x200](./vue.png)
