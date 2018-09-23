const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

process.env.NODE_ENV = 'development';
module.exports = {
	mode: 'development',

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Flight Search Engine',
			inject: true,
			template: './src/views/index.html',
		}),
		new ErrorOverlayPlugin(),
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(false),
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			},
		}),
	],
	performance: {
		hints: 'warning',
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 2,
						},
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								ctx: {},
							},
						},
					},
				],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 3,
						},
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			// {
			// 	test: /\.(png|jpg|gif|svg|jpeg)$/,
			// 	exclude: /fonts/,
			// 	use: [
			// 		{
			// 			loader: 'url-loader',
			// 			options: {
			// 				limit: 8192,
			// 				fallback: 'file-loader',
			// 			},
			// 		},
			// 	],
			// },
			{
				test: /\.(svg)$/,
				exclude: /fonts/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							noquotes: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif|jpeg)$/,
				exclude: /fonts/,
				use: [
					{
						loader: 'file-loader',

						options: {
							outputPath: 'images/',
							name: '[name][hash].[ext]',
						},
					},
				],
			},
			{
				test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				exclude: /images/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/',
							name: '[name][hash].[ext]',
						},
					},
				],
			},
		],
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		historyApiFallback: true,
		port: 5000,
		// proxy: {
		//   '/auth/google': 'http://localhost:5000',
		// },

		// port: 4000
		// compress: true,
	},
	devtool: 'eval-source-map',
};
