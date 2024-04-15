const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: './src/js/index.ts', // Path to your main JavaScript file
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js' // Output bundle filename
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Apply ts-loader to .ts files
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/, // Apply the following loader to .css files only
                use: [MiniCssExtractPlugin.loader, 'css-loader'] // Use these loaders (from right to left)
            },
            {
                test: /\.(png|svg|jpg|gif)$/, // Apply the following loader to image files
                use: ['file-loader'] // Use file-loader to handle image files
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'] // Add .ts extension to resolve TypeScript files
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
};