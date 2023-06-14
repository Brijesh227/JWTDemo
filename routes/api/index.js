const express = require('express');
const foodRoute = require('./food/index')
const router = express.Router();

router.use("/food", foodRoute);

module.exports = { router };