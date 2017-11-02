const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: './static/src/index.js',
    output: {
        path: `${__dirname}/../public/scripts/`,
        filename: 'bundle.js',
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
        }),
    ],
    watch: true,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /(node_modules)/,
            }, {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                ],
            }, {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'eslint-loader',
                options: {},
            },
        ],
    },
    devServer: {
        contentBase: 'public',
    },
    resolve: {
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat",
            "react-tap-event-plugin": "preact-tap-event-plugin",
        },
    },
};

module.exports = config;
