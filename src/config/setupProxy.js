const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
      ws: true, // 웹소켓 지원을 활성화
      logLevel: 'debug', // 디버깅을 위한 로그 레벨 (선택 사항)
    })
  );
};