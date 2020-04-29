const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  // 去掉所有的console
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 发布产品时候的插件数组
    ...prodPlugins
  ]
}
