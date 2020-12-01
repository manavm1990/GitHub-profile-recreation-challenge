module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/index.js",

  resolve: {
    // 'Absolute imports'
    modules: ["src", "node_modules"],
  },
};
