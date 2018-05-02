const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || "development";
module.exports = {
    module: require('../config/module'),
    plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new webpack.EnvironmentPlugin([
            "NODE_ENV"
        ])
    ]
};