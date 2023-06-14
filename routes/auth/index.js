const express = require('express');
const { loginHandler } = require('./login/index');
const { registerUserHandler } = require('./register/index');
const router = express.Router();

router.post("/register", registerUserHandler);
router.post("/login", loginHandler);

module.exports = { router };