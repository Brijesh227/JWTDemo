const express = require('express');
const userRoleList = require('../../../config/role');
const foodController = require('../../../controllers/food/foodController');
const { verifyJwtToken } = require('../../../middleware/verifyJwtToken');
const { verifyRole } = require('../../../middleware/verifyRole');
const router = express.Router();

router.get("/:foodtype", verifyJwtToken, foodController.getFoodListByFoodType);
router.post("/add", verifyRole(userRoleList.Admin), foodController.createFoodItem);
router.put("/edit/:foodName", verifyRole(userRoleList.Admin), foodController.updateFoodItem);

module.exports = router;
