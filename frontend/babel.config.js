module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      // Move nativewind/babel here to the presets array:
      "nativewind/babel", 
    ],
    // The plugins array is now empty or contains other plugins:
    plugins: [], 
  };
};
