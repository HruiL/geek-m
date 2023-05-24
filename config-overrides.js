const { aliasWebpack } = require("react-app-alias");
function addLessLoader(config) {
  config.module.rules[1].oneOf.splice(2, 0, {
    test: /\.less$/i,
    use: ["style-loader", "css-loader", "less-loader"],
  });
}
module.exports = function override(config) {
  aliasWebpack({ tsconfig: "./tsconfig.json" })(config);
  addLessLoader(config);
  return config;
};
