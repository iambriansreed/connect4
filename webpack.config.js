const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./style.css",
        }),
    ],
    entry: "./src/app.ts",
    output: {
        filename: "./app.js",
        path: path.resolve(__dirname, "./docs"),
    },
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "docs"),
            watch: true,
        },
        port: 9000,
        open: true,
        https: true,
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
};
