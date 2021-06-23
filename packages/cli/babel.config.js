<<<<<<< HEAD
module.exports = function(api) {
=======
module.exports = function (api) {
>>>>>>> 45f35956 (feat(cli): implemented framework for tests)
  api.cache(true);

  const presets = ['@babel/preset-env'];

  return {
    presets,
  };
};
