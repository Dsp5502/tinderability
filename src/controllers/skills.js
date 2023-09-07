const { matchedData } = require('express-validator');
const { skillModel } = require('../models');
const { handleHttpError } = require('../utils');

/**
 *  * Obtener lista de skills
 * @param {*} req
 * @param {*} res
 */
const getSkills = async (req, res) => {
  try {
    const skills = await skillModel.findAll();
    res.json({ skills });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_SKILLS', 500);
  }
};

/**
 * Obtener un skill por su ID
 * @param {*} req
 * @param {*} res
 */
const getSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const skill = await skillModel.findByPk(skillId);

    if (!skill) {
      return handleHttpError(res, 'SKILL_NOT_FOUND', 404);
    }

    res.status(200).json(skill);
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_SKILL', 500);
  }
};

/**
 * Crear una skill
 * @param {*} req
 * @param {*} res
 */
const createSkill = async (req, res) => {
  try {
    const skillBody = matchedData(req);
    const newSkill = await skillModel.create(skillBody);
    res.status(201).json(newSkill);
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_SKILL', 500);
  }
};

/**
 *  Actualiza un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateSkill = async (req, res) => {
  const skillId = req.params.id;
  const { name, description } = req.body;

  try {
    const [updatedCount] = await skillModel.update(
      {
        name,
        description,
        updated_at: new Date(),
      },
      {
        where: { skill_id: skillId },
      }
    );

    if (updatedCount === 0) {
      handleHttpError(res, 'SKILL_NOT_FOUND', 404);
      return;
    }

    const updatedSkill = await skillModel.findByPk(skillId);

    return res.status(200).json(updatedSkill);
  } catch (error) {
    console.error('ERROR_UPDATE_SKILL:', error);
    handleHttpError(res, 'ERROR_UPDATE_SKILL', 500);
  }
};

/**
 *  * Elimina el usuario
 * @param {*} req
 * @param {*} res
 */
const deleteSkill = async (req, res) => {
  const skillId = req.params.id;

  try {
    const existingSkill = await skillModel.findByPk(skillId);
    await existingSkill.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('ERROR_DELETE_SKILL:', error);
    handleHttpError(res, 'ERROR_DELETE_SKILL', 500);
  }
};

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
