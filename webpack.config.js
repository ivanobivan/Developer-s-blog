const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || "development";
const SERVER_TYPE = process.env.SERVER_TYPE || "local";
const isDevelopment = NODE_ENV === "development";

module.exports = {
    devtool: isDevelopment ? "inline-source-map" : "",
    entry: {
        client: "./src/client/app.jsx",
        admin: "./src/admin/app.jsx"
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: "[name].js"
    },
    watch: isDevelopment,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
                SERVER_TYPE: JSON.stringify(SERVER_TYPE)
            }
        })
    ],
    module: require('./config/module'),
};

if(!isDevelopment) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            drop_console: true,
            unsafe: true
        })
    )
}
