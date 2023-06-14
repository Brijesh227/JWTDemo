const Food = require('../model/foodSchema');
const { errorGenerator } = require('../common/utility/errorGenerator');

async function getFoodListByFoodType(req, res) {
    try {
        const { foodtype } = req.params;
        if (!foodtype) {
            return errorGenerator(res, 404);
        }
        const foodList = await Food.find({ category: foodtype }).exec();
        res.send(200).json({ foodList });
    } catch (err) {
        console.log(err);
    }
}

async function createFoodItem(req, res) {
    try {
        const { name, category, description, price } = req.body;
        if (!name || !category || !price || !description) {
            return errorGenerator(res, 400);
        }
        const foodItem = await Food.create({
            name,
            category,
            description,
            price
        })
        res.send(200).json(foodItem);
    } catch (err) {
        console.log(err);
    }
}

async function updateFoodItem(req, res) {
    try {
        const { name, category, description, price } = req.body;
        if (!name || !category || !price || !description) {
            return errorGenerator(res, 400);
        }
        
        res.send(200).json(foodItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getFoodListByFoodType,
    createFoodItem,
    updateFoodItem
}