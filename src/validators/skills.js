const { check } = require('express-validator');
const { validateResults } = require('../utils');
const { existSkillById } = require('../utils/dbvalidators');

const createSkillValidation = [
  check('name', 'El nombre es obligatorio')
    .notEmpty()
    .isString()
    .withMessage('El nombre debe ser una cadena de caracteres')
    .isLength({ max: 100 })
    .withMessage('El nombre no puede tener más de 100 caracteres'),
  check('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de caracteres'),
  (req, res, next) => validateResults(req, res, next),
];

const updateSkillValidation = [
  check('id').custom(existSkillById),
  check('name', 'El nombre es obligatorio')
    .notEmpty()
    .isString()
    .withMessage('El nombre debe ser una cadena de caracteres')
    .isLength({ max: 100 })
    .withMessage('El nombre no puede tener más de 100 caracteres'),
  check('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de caracteres'),
  (req, res, next) => validateResults(req, res, next),
];

const deleteSkillValidation = [
  check('id').custom(existSkillById),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  createSkillValidation,
  updateSkillValidation,
  deleteSkillValidation,
};
