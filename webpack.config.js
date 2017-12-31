const path = require("path");

module.exports = {
    entry: "./main",
    resolve: {
        extensions: [".js", ".ts"]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        port: 4200,
        open: true,
        compress: true
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
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]"
                    }
                }]
            }
        ]
    }
};