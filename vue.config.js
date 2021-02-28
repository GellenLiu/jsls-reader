module.exports = {
	publicPath = "./",
	 devServer: {
	proxy: {
	     '/api': {
	       target: 'http://127.0.0.1:8099',
	       changeOrigin: true,
	       pathRewrite: {
	         '^/api': ''
	       }
	     }
	   },
	   }
}