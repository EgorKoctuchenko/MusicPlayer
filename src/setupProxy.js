const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/dropbox-api",
    createProxyMiddleware({
      target: "https://api.dropboxapi.com", // Замените на URL Dropbox API
      changeOrigin: true,
    })
  );
};
