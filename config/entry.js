const env = require("./environment");
const path = require("path");

module.exports = [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    path.join(__dirname, "../src/less/index.less"),
    path.join(__dirname, "../src/app.jsx")
];
