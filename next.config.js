const withImages = require('next-images')

module.exports = withImages({
	// Enforce use of webpack 5
	future: { webpack5: true },

	// webpack(config) {
	// 	// custom loader to allow SVG imports directly in react
	// 	config.module.rules.push({
	// 		test: /\.svg$/,
	// 		issuer: {
	// 			test: /\.(js|ts)x?$/,
	// 		},
	// 		use: ['@svgr/webpack'],
	// 	});
	// 	return config;
	// },
});