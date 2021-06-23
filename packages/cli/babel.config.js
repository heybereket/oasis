<<<<<<< HEAD
<<<<<<< HEAD
module.exports = function(api) {
=======
module.exports = function (api) {
>>>>>>> 45f35956 (feat(cli): implemented framework for tests)
=======
module.exports = function(api) {
>>>>>>> f6dbf5ea (test(cli): todo tests dont accept functions)
  api.cache(true);

  const presets = ['@babel/preset-env'];

  return {
    presets,
  };
};
