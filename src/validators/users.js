const { check } = require('express-validator');
const { validateResults, emailExists, existUserById } = require('../utils');

const validatorCreateUser = [
  check('first_name', 'El nombre es obligatorio')
    .notEmpty()
    .isString()
    .withMessage('El nombre debe ser una cadena de caracteres'),
  check('last_name')
    .optional()
    .isString()
    .withMessage('El apellido debe ser una cadena de caracteres'),
  check('email', 'El correo electrónico es obligatorio')
    .notEmpty()
    .isEmail()
    .withMessage('El correo electrónico no es válido')
    .custom(emailExists),
  check('password_hash', 'La contraseña es obligatoria')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('phone_number')
    .optional()
    .isString()
    .withMessage('El número de teléfono debe ser una cadena de caracteres'),
  (req, res, next) => validateResults(req, res, next),
];

const validatorUpdateUser = [
  check('id').custom(existUserById),
  check('first_name', 'El nombre es obligatorio')
    .notEmpty()
    .isString()
    .withMessage('El nombre debe ser una cadena de caracteres'),
  check('last_name')
    .optional()
    .isString()
    .withMessage('El apellido debe ser una cadena de caracteres'),
  check('email', 'El correo electrónico es obligatorio')
    .notEmpty()
    .isEmail()
    .withMessage('El correo electrónico no es válido'),
  check('phone_number')
    .optional()
    .isString()
    .withMessage('El némero de teléfono debe ser una cadena de caracteres'),
  (req, res, next) => validateResults(req, res, next),
];

const validatorDeleteUser = [
  check('id').custom(existUserById),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validatorCreateUser,
  validatorUpdateUser,
  validatorDeleteUser,
};
