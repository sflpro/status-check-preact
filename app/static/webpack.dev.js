const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: `${__dirname}/src/index.js`,
    output: {
        path: `${__dirname}/../public/`,
        filename: 'scripts/bundle.js',
    },
    watch: true,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/',
                        },
                    },
                ],
            },
        ],
    },

});
