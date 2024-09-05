module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/api': { target: 'http://localhost:7878', changeOrigin: true },
    },
  },
}
