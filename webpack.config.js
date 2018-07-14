const DEBUG = process.env.NODE_ENV === 'development';

const path = require('path');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "webcore.css",
    disable: DEBUG
});

const baseConfig = {
    mode: "development",
    devtool: 'inline-source-map',
    resolve: { extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'], alias: {}, plugins: [new TsConfigPathsPlugin()] },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            {
                test: /\.css$/,
                use: extractSass.extract({ use: ["css-loader", "resolve-url-loader"], fallback: 'style-loader' })
            }, {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    watchOptions: {
        poll: true
    }
};

const copyConfig = () => JSON.parse(JSON.stringify(baseConfig));
const clientConfig = Object.assign({}, baseConfig, {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: `webcore.[chunkhash:8].js`
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackCleanupPlugin()
    ],
});

module.exports = [clientConfig];