const express = require('express');

const router = express.Router();

const {
  getSkill,
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} = require('../controllers/skills');

const {
  createSkillValidation,
  updateSkillValidation,
  deleteSkillValidation,
} = require('../validators/skills');

router.get('/', getSkills);
router.get('/:id', getSkill);
router.post('/', createSkillValidation, createSkill);
router.put('/:id', updateSkillValidation, updateSkill);
router.delete('/:id', deleteSkillValidation, deleteSkill);

module.exports = router;
