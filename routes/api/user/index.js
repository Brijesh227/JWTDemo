const express = require('express');
const userRoleList = require('../../../config/role');
const userController = require('../../../controllers/user/userController');
const { verifyJwtToken } = require('../../../middleware/verifyJwtToken');
const { verifyRole } = require('../../../middleware/verifyRole');
const router = express.Router();

router.use(verifyJwtToken);
router.get("/user", userController.getUserByUserId);

module.exports = router;
