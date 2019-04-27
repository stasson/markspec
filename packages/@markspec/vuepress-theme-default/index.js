const path = require('path')
const pluginPreset = require('@markspec/vuepress-plugin-preset')

// Theme API.
module.exports = (options, ctx) => ({
  extend: '@vuepress/theme-default',
  plugins: [pluginPreset]
})
