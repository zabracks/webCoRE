const DEBUG = process.env.NODE_ENV === 'development';

const webpack = require("webpack");

const path = require("path");
const resolve = path.resolve;

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const tsImportPluginFactory = require('ts-import-plugin');

//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');


const DEV_SERVER = {
    disableHostCheck: DEBUG,
    host: "0.0.0.0",
    port: '8123',
    // Change it if other port needs to be used
    hot: true,
    // enable HMR on the server
    //noInfo: true,
    quiet: false,
    // minimize the output to terminal.
    contentBase: resolve(__dirname, 'src'),
    // match the output path
    publicPath: '/',
    historyApiFallback: true

// match the output `publicPath`
};

module.exports = {
    mode: "development",
    devtool: DEBUG ? 'inline-source-map' : undefined,
    devServer: DEV_SERVER,
    resolve: {
        extensions: [
            '.webpack.js', '.web.js',
            '.ts', '.tsx',
            '.js',
            ".json"
        ],
        alias: {},
        plugins: [
            new TsConfigPathsPlugin(),
        ],
    },

    context: path.resolve(__dirname, "src"),
    entry: "./index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: `[name].[hash].bundle.js`,
        chunkFilename: `[name].[chunkHash].js`,
    },

    optimization: {
        splitChunks: {
            chunks: "all",
        }
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            getCustomTransformers: () => ({
                                before: [
                                    tsImportPluginFactory({
                                        libraryName: "material-ui",
                                        libraryDirectory: "",
                                        camel2DashComponentName: false,
                                    })
                                ]
                            })
                        }},
                ],
                exclude: [resolve(__dirname, "node_modules")],
            },
            {
                test: /\.css$/,
                //use: extractSass.extract({ use: ["css-loader", "resolve-url-loader"], fallback: 'style-loader' })
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ],
            },
            {
                test: /\.svg/,
                use: {
                    //loader: 'svg-url-loader',
                    loader: "url-loader",
                    options: {
                        name: 'static/[hash]-[name].[ext]',
                    }
                }
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'static/[hash]-[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'static/[hash]-[name].[ext]',
                    }
                }]
            }
        ]
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    watchOptions: {
        poll: false
    },

    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version),
            DEBUG
        }),
        //extractSass,
        ...(DEBUG ? [
            new webpack.HotModuleReplacementPlugin({
                // multiStep: true, // better performance with many files
            }),
            new webpack.NamedModulesPlugin(),
        ] : [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                compress: {
                    screw_ie8: true
                },
                comments: false,
                sourceMap: isSourceMap,
            }),
        ]),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackCleanupPlugin(),
    ],
};
