const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {//directorio de salida
        //ruta actual, ruta de destino
        path: path.resolve(__dirname, 'dist'),
        //nombre del archivo principal
        filename: "bundle.js"
    },
    //extensiones que puede resolver
    resolve: {
        extensions: ['.js','.jsx']
    },
    //reglas del proyecto
    module: {
        rules: [
            {
                //se pasa expresión regular para identificar archivos js y jsx
                test: /\.(js|jsx)$/,
                //se excluye la carpeta node_modules
                exclude: /node_modules/,
                use: 
                    {
                        loader: "babel-loader"
                    }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [
                    {
                        'loader': 'file-loader',
                        options: {
                            name: 'assets/[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
           //donde esta ubicado el template y el filename
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css'
        }),
    ]
};