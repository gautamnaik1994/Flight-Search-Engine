const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* eslint-disable */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
/* eslint-enable */
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

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
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(true),
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
		new HtmlWebpackPlugin({
			title: 'Flight Search Engine',
			inject: true,
			template: './src/views/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash:8].css',

		}),
		// new BundleAnalyzerPlugin(),
		new workboxPlugin.GenerateSW({
			swDest: 'sw.js',
			clientsClaim: true,
			skipWaiting: true,
		}),
		new FaviconsWebpackPlugin({
			// Your source logo
			logo: path.resolve('src/images/favicon.png'),
			// The prefix for all image files (might be a folder or a name)
			prefix: 'icons-[hash]/',
			// Emit all stats of the generated icons
			emitStats: false,
			// The name of the json containing all favicon information
			statsFilename: 'iconstats-[hash].json',
			// Generate a cache file with control hashes and
			// don't rebuild the favicons until those hashes change
			persistentCache: true,
			// Inject the html into the html-webpack-plugin
			inject: true,
			// favicon background color (see https://github.com/haydenbleasel/favicons#usage)
			background: '#fff',
			// favicon app title (see https://github.com/haydenbleasel/favicons#usage)
			title: 'Flight Search Engine',

			// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,

				favicons: true,


			}
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
				{
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output

            }
          },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					'resolve-url-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,

						},
					},
				],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output

            }
          },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 3,
						},
					},
					'resolve-url-loader',
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
};
