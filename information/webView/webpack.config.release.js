const htmlP = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        main: "./src/index.tsx"
    },
    output: {
        filename: "static/budle.js",
        path: path.resolve(__dirname, "views")
    },
    devServer: {
        contentBase: './dist', // 设置实时监听打包文件的目录 
        port: 8080 // 端口            
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new htmlP({
            template: path.resolve(__dirname, "index.html")
        })
    ],

    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                        }
                    }
                ],

            },
            {
                test: /\.(ts|tsx)$/,
                use: ["ts-loader"]
            }
        ]
    }

}