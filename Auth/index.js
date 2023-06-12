const express = require('express');
const { loginHandler } = require('../Controllers/loginHandler');
const router = express.Router();

router.post("/login", loginHandler);

module.exports = { router };