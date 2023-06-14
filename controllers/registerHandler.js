const bcrypt = require('bcrypt');
const User = require('../model/userSchema');
require('dotenv').config();
const { errorGenerator } = require('../common/utility/errorGenerator');

exports.registerHandler = async function (req, res) {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return errorGenerator(res, 400, "username or password are not provided.")
    }
    const findDuplicateUser = await User.findOne({ username: userName }).exec();
    if (findDuplicateUser) {
        return errorGenerator(res, 401, "user already existed.")
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            "username": userName,
            "password": hashedPassword
        })
        console.log('newuser', newUser);
        res.status(200).send("user created Successfully");
    } catch (err) {
        errorGenerator(res, 500);
    }
}
