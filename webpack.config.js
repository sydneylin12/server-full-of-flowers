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
                test: /\.tsx?$/,
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
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
};