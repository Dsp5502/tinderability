const { userModel } = require('../models');

const emailExists = async (email = '') => {
  const existsEmail = await userModel.findOne({ email });
  if (existsEmail) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};

const existUserById = async (id) => {
  const existsUser = await userModel.findByPk(id);
  if (!existsUser) {
    throw new Error(`The user with id: ${id} does not exist`);
  }
};

module.exports = {
  emailExists,
  existUserById,
};
