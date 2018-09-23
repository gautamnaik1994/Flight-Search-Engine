const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* eslint-disable */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
/* eslint-enable */
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

process.env.NODE_ENV = 'production';

module.exports = {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash:8].js',
	},
	plugins: [
		new WebpackBar({
			profile: true,
		}),
		new HtmlWebpackPlugin({
			title: 'Flight Search Engine',
			inject: true,
			template: './src/views/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash:8].css',
		}),
		new BundleAnalyzerPlugin(),
		new workboxPlugin.GenerateSW({
			swDest: 'sw.js',
			clientsClaim: true,
			skipWaiting: true,
		}),
		new WebpackPwaManifest({
			name: 'Flight Search Engine',
			short_name: 'Flight Search Engine',
			description: 'Flight Search Engine',
			background_color: '#ffffff',
			icons: [
				{
					src: path.resolve('src/images/favicon.png'),
					sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
				},
				{
					src: path.resolve('src/images/favicon.png'),
					size: '1024x1024', // you can also use the specifications pattern
				},
			],
		}),
	],
	performance: {
		hints: 'warning',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
				commons: {
					chunks: 'initial',
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
				},
			},
		},
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
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							importLoaders: 2,
						},
					},
					'resolve-url-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							importLoaders: 3,
						},
					},
					'resolve-url-loader',
					'postcss-loader',
					'sass-loader',
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
							name: '[name][chunkhash].[ext]',
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
							name: '[name][chunkhash].[ext]',
						},
					},
				],
			},
		],
	},
};
