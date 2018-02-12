const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const environments = require('./environment');

const isExternal = (module) => {
    const context = module.context;

    if (typeof context !== 'string') {
        return false;
    }

    return context.indexOf('node_modules') !== -1;
};

const plugins = [
    // Разбор того, что должно попасть во внешний vendor файл
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => isExternal(module)
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(environments.ENVIRONMENT)
        }
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer,
                precss
            ]
        }
    })
];

if (!environments.IS_PRODUCTION) {
    // Добавляем плагин hot-reload в дев сборку
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = plugins;
