const { matchedData } = require('express-validator');

const bcryptjs = require('bcryptjs');
const { userModel } = require('../models');
const { handleHttpError } = require('../utils');

/**
 *  * Obtener lista de usuarios
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      attributes: {
        exclude: ['password_hash'],
      },
    });
    res.json({ users });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_USERS', 500);
  }
};

/**
 * Obtener un usuario por su ID
 * @param {*} req
 * @param {*} res
 */
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findByPk(userId, {
      attributes: {
        exclude: ['password_hash'],
      },
    });

    if (!user) {
      return handleHttpError(res, 'USER_NOT_FOUND', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_USER', 500);
  }
};

/**
 * Crear un usuario
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  try {
    const { password_hash, ...rest } = matchedData(req);
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password_hash, salt);

    const newUser = await userModel.create({
      ...rest,
      password_hash: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_USER', 500);
  }
};

/**
 *  Actualiza un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, email, phone_number } = req.body;

  try {
    const [updatedCount] = await userModel.update(
      {
        first_name,
        last_name,
        email,
        phone_number,
        updated_at: new Date(),
      },
      {
        where: { user_id: userId },
      }
    );

    if (updatedCount === 0) {
      handleHttpError(res, 'USER_NOT_FOUND', 404);
      return;
    }

    const updatedUser = await userModel.findByPk(userId, {
      attributes: {
        exclude: ['password_hash'],
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('ERROR_UPDATE_USER:', error);
    handleHttpError(res, 'ERROR_UPDATE_USER', 500);
  }
};

/**
 *  * Elimina el usuario
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const existingUser = await userModel.findByPk(userId);
    await existingUser.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('ERROR_DELETE_USER:', error);
    handleHttpError(res, 'ERROR_DELETE_USER', 500);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
