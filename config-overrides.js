const path = require("path");

module.exports = function override(config, env) {
  // Добавляем полифилы для Node.js модулей
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
  };

  return config;
};
