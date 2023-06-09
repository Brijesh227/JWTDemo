const json = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { errorGenerator } = require('../Common/utility/errorGenerator');

exports.loginHandler = async function (req, res) {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return errorGenerator(res, 400, "username or password is not provided.")
    }
    const findUser = true;
    if (!findUser) {
        return errorGenerator(res, 401, "username or password is wrong.")
    } else {
        try {
            //const isPasswordMatched = await bcrypt.compare(password, findUser.Password);
            const isPasswordMatched = true;
            if (isPasswordMatched) {
                const accessToken = await json.sign({ userName }, process.env.PRIVATE_KEY, {
                    expiresIn: 30 * 60
                });
                console.log('accesstoken',accessToken);
                res.status(200).cookie("jwt", accessToken, {
                    httpOnly: true,
                    maxAge: 6 * 60 * 60 * 1000
                }).end();
            } else {
                return errorGenerator(res, 401, "password is wrong.")
            }
        } catch (err) {
            errorGenerator(res, 500);
        }
    }
}
