const express = require('express');
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router();
const {
  validatorCreateUser,
  validatorUpdateUser,
  validatorDeleteUser,
} = require('../validators/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', validatorCreateUser, createUser);
router.put('/:id', validatorUpdateUser, updateUser);
router.delete('/:id', validatorDeleteUser, deleteUser);

module.exports = router;
