const express = require('express');
const router = express.Router();
const {UsersController} = require('./../controller/users');

const {role} = require('../middleware/auth');
router.post("/register/:role", role, UsersController.insert);
router.post("/login", UsersController.login);

module.exports = router;
