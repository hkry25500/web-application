import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'


export default
{
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'), // the bundle output path
        filename: 'main.js', // the name of the bundle
        publicPath: '/', // make sure that router is working well
    },
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
        alias: {
            '@/': path.resolve(__dirname, 'src/'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@apis': path.resolve(__dirname, 'src/apis'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@i18n': path.resolve(__dirname, 'src/i18n'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html' // to import index.html file inside index.js
        }),
    ],
    devServer: {
        port: 80, // you can change the port
        historyApiFallback: true,
        allowedHosts: 'all',
    },
    module: {
        rules:
        [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};