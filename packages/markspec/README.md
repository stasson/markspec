# `markspec`

> Under development

## Footnotes

### Block footnotes

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.
  Subsequent paragraphs are indented to show that they
  belong to the previous footnote.

### Inline footnotes

Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]

## Code block

```typescript
class Hello {
  message: world;
}
```

```bash
rm -rf .
```

## Uml Diagram (plantuml)

```uml
A->B: request
B-->A: ack
```

## Math (katex)

```math
\begin{pmatrix}x\\y\end{pmatrix}
```

## Images

![vue](./vue.png)
