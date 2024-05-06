const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const webpack = require("webpack");
const deps = require("./package.json").dependencies;
require("dotenv").config({ path: "./.env" });
module.exports = (_, argv) => ({
	output: {
		publicPath: process.env.REACT_SIDE_ENDPOINT,
	},
	mode: "development",
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
		alias: {
			"@": path.resolve(__dirname, "src/"),
			"@SVG": path.resolve(__dirname, "src/assets/svg"),
			"@API": path.resolve(__dirname, "src/api"),
			"@Images": path.resolve(__dirname, "src/assets/images"),
			"@Layout": path.resolve(__dirname, "src/layout"),
			"@Components": path.resolve(__dirname, "src/components"),
			"@Shared": path.resolve(__dirname, "src/shared"),
			"@Modules": path.resolve(__dirname, "src/modules"),
			"@Models": path.resolve(__dirname, "src/models"),
			"@Core": path.resolve(__dirname, "src/core"),
			"@Constants": path.resolve(__dirname, "src/constants"),
			"@Context": path.resolve(__dirname, "src/context"),
			"@Socket": path.resolve(__dirname, "src/socket"),
			"@Zustand": path.resolve(__dirname, "src/zustand"),
		},
	},

	devServer: {
		port: 3000,
		historyApiFallback: true,
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
			},

			{
				test: /\.(css|s[ac]ss)$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/i,
				use: ["url-loader"],
			},

			{
				test: /\.svg$/,
				use: ["@svgr/webpack", "file-loader"],
			},
		],
	},

	plugins: [
		new ModuleFederationPlugin({
			name: "frontend",
			filename: "remoteEntry.js",
			remotes: {
				feed: "feed@https://breeze-feed.vercel.app/remoteEntry.js",
				BreezeGPT: `BreezeGPT@${process.env.REACT_SIDE_BREEGEGPT_ENDPOINT}remoteEntry.js`,
			},
			exposes: {},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new HtmlWebPackPlugin({
			template: "./public/index.html",
		}),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(process.env),
		}),
	],
});
