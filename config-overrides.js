const { addWebpackAlias, removeModuleScopePlugin, babelInclude, override } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')
const path = require('path')

module.exports = (config, env) => {
  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx', '.js', '.jsx']
  return override(
    addReactRefresh({ disableRefreshCheck: true }),
    removeModuleScopePlugin(),
    babelInclude([path.resolve('src'), path.resolve('./src')]),
    addWebpackAlias({
      src: path.resolve('./src/'),
      scenes: path.resolve('./src/scenes/')
    })
  )(config, env)
}
