const { userModel, skillModel } = require('../models');

const emailExists = async (email = '') => {
  const existsEmail = await userModel.findOne({ where: { email } });
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

const existSkillById = async (id) => {
  const existSkill = await skillModel.findByPk(id);
  if (!existSkill) {
    throw new Error(`The skill with id: ${id} does not exist`);
  }
};

module.exports = {
  emailExists,
  existUserById,
  existSkillById,
};
