/* eslint linebreak-style: ["error", "windows"] */

const path = require("path");

module.exports = {
  // The entry point file described above
  entry: {
    login: "../src/login.js",
    main: "../src/main.js",
    search: "../src/search.js",
    request: "../src/request.js",
  },
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname + "/../../public/js/", "dist"),
    filename: "[name].bundle.js",
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: "eval-source-map",
};
