const path = require("path");

module.exports = {
    entry: "./main",
    resolve: {
        extensions: [".js", ".ts"]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3000,
        open: true,
        compress: true
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "url-loader?limit=10000",
                    "img-loader"
                ]
            }
        ]
    }
};