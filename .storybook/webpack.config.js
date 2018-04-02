const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || "development";
const SERVER_TYPE = process.env.SERVER_TYPE || "local";
module.exports = {
    module: require('../config/module'),
    plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
                SERVER_TYPE: JSON.stringify(SERVER_TYPE)
            }
        }),
        new webpack.EnvironmentPlugin([
            "NODE_ENV",
            "SERVER_TYPE"
        ])
    ]
};