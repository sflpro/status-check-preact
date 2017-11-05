module.exports = {
    entry: `${__dirname}/src/index.js`,
    output: {
        path: `${__dirname}/../public/scripts/`,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
                loader: 'file-loader'
            }
        ]
    }
}
