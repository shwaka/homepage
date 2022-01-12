const path = require('path');

module.exports = function myPlugin(context, options) {
  return {
    name: "my-plugin",
    configureWebpack(config, isServer, utils) {
      // console.log(config)
      return {
        resolve: {
          alias: {
            "@data": path.resolve(context.siteDir, "src/data")
          }
        }
      }
    }
  }
}
