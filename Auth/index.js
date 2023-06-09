const express = require('express');
const { loginHandler } = require('../Controllers/LoginHandler');
const router = express.Router();

router.post("/login", loginHandler);

module.exports = { router };