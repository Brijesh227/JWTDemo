const User = require('../../model/userSchema');
const { errorGenerator } = require('../../common/utility/errorGenerator');

async function getUserByUserId(req, res) {
    try {
        const { userId } = req.body;
        if (!userId) {
            return errorGenerator(res, 400);
        }
        const foundUser = await User.find({ username: userId }).exec();
        return foundUser ? res.send(200).json({ foundUser }) : res.sendStatus(204);
    } catch (err) {
        console.log(err);
    }
}

async function createUserItem(req, res) {
    try {
        const { name, category, description, price } = req.body;
        if (!name || !category || !price || !description) {
            return errorGenerator(res, 400);
        }
        const foodItem = await User.create({
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

async function updateUserItem(req, res) {
    try {
        const { name, category, description, price } = req.body;
        if (!name && !category && !price && !description) {
            return errorGenerator(res, 400);
        }
        const foodItem = await User.
        res.send(200).json(foodItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUserByUserId,
    createUserItem,
    updateUserItem
}