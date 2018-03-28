const path = require('path');

module.exports = {
    rules: [
        {
            test: /\.(js|jsx)?$/,
            exclude: [/node_modules/],
            loader: 'babel-loader'
        },
        /*{
            test: /\.jsx?$/,
            enforce: "pre",
            loader: "eslint-loader"
        },*/
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
        }
    ]
};