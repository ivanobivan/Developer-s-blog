const env = require('./environment');

const babelPlugins = [];

if (!env.IS_PRODUCTION) {
    babelPlugins.push('react-hot-loader/babel');
}

module.exports = {
    rules: [
        {
            test: /\.(js|jsx)?$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            query: {
                plugins: babelPlugins
            }
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
        }
    ]
};
