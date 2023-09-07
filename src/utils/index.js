const { emailExists, existUserById } = require('./dbvalidators');

module.exports = {
  validateResults: require('./handleValidator'),
  handleHttpError: require('./handleError'),
  emailExists,
  existUserById,
};
