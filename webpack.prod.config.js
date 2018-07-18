const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        scriptDo: './src/client/app.jsx'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', 'less']
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
