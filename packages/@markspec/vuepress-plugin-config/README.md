# `@markspec/vuepress-plugin-config`

> autoconfig plugin with optional vuepressrc

## vuepressrc

vuepress autoconfig extension file

- `vuepress` property in package.json
- `.vuepressrc` file in JSON or YAML format
- `.vuepressrc.json` file
- `.vuepressrc.yml` file
- `vuepress.config.js` file exporting a JS object

## autoconf

```javascript
class {

  /**
   * @default package.name
   */
  title: string

  /**
   * @default package.description
   */
  description: string

  /**
   * @default package.author.email
   */
  author = string,

  /**
   * when set to true, will build nav and sidebar automatically
   * fallbacks to nav and sidebar otherwise
   *
   * @default true
   */
  autonav: boolean | 'all' ,

  /**
   * 
   * @default []
   */
  links: [],

  /**
   * @default package.repository.url
   */
  repository: string,

  /**
   * only supports evergreen browsers
   * @default: true
   */
  evergreen: boolean

  /**
   * dump site config in console
   * @default: false
   */
  dbgDump: boolean
}
```
