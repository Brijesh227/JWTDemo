const express = require('express');
const { loginHandler } = require('../Controllers/loginHandler');
const { registerHandler } = require('../Controllers/registerHandler');
const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

module.exports = { router };