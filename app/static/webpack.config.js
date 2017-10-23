const config = {
    entry: './static/src/index.js',
    output: {
        path: `${__dirname}/../public/scripts/`,
        filename: 'bundle.js'
    },
    watch: true,
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/, use: ['babel-loader'], 
                exclude: /(node_modules)/,
            }, {
                test: /\.css$/, use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }, {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'eslint-loader',
                options: {},
            }
        ]
    }, devServer: {
        contentBase: 'public'
    }
};

module.exports = config;
