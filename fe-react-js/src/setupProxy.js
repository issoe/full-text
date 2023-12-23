const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Điều chỉnh đường dẫn API của bạn
    createProxyMiddleware({
      target: 'http://localhost:5000', // Đường dẫn của Flask server của bạn
      changeOrigin: true,
    })
  );
};