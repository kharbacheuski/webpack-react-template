const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

process.env.BABEL_ENV = 'development';

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src', 'index.ts'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	resolve: {
		extensions: ['.json', '.tsx', '.ts', '.js'],
		alias: {
			'@styles': path.resolve(__dirname, 'src', 'styles'),
		}
	},
	module: {
		rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
			{
				test: /\.(s*)css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
				  	"sass-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
				  {
					loader: 'file-loader',
				  },
				],
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ 
			template: path.resolve(__dirname, "index.html")
		}
		),
		new MiniCssExtractPlugin({
			filename: '[name].styles.css',
		}),
	],
	performance : {
		hints : false
	},
	devServer: {
		static: {
		  directory: path.resolve(__dirname, '../', 'public'),
		},
		compress: true,
		port: 3000,
		open: true,
	}
};
