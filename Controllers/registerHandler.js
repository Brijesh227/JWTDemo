const bcrypt = require('bcrypt');
require('dotenv').config();
const { errorGenerator } = require('../Common/utility/errorGenerator');

exports.registerHandler = async function (req, res) {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return errorGenerator(res, 400, "username or password are not provided.")
    }
    const findDuplicateUser = false; // db call
    if (findDuplicateUser) {
        return errorGenerator(res, 401, "user already existed.")
    }
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        // store hashedPassword in db.
        res.status(200).send("user created Successfully");
    } catch (err) {
        errorGenerator(res, 500);
    }
}
