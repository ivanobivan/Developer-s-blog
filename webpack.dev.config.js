const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: "inline-source-map",
    entry: {
        client: "./src/client/app.jsx",
        admin: "./src/admin/app.jsx"
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: "[name].js"
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    resolve: {
        extensions: ['.js', '.jsx','.css','less']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },

            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                exclude: /node_modules/,
                loader: 'url-loader'
            },
        ]
    }
};
