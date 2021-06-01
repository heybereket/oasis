const preprocessor = require('./preprocessor');

module.exports = (on) => {
  on('file:preprocessor', preprocessor);
};
