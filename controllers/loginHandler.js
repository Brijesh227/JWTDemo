const json = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/userSchema');
require('dotenv').config();
const { errorGenerator } = require('../common/utility/errorGenerator');

const updaterefreshToken = async (username,refreshToken) => {
    try {
        await User.updateOne(
            {username},
            {
                $set: {
                    $refer
                }
            })
    } catch (err) {
        throw new Error(err);
    }
    
}

exports.loginHandler = async function (req, res) {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return errorGenerator(res, 400, "username or password are not provided.")
    }
    const findUser = await User.findOne({
        username: userName,
    }).exec();
    if (!findUser) {
        return errorGenerator(res, 401, "can't find user.")
    } else {
        try {
            const isPasswordMatched = await bcrypt.compare(password, findUser.password);
            if (isPasswordMatched) {
                const accessToken = await json.sign({ userName }, process.env.ACCESS_PRIVATE_KEY, {
                    expiresIn: '1h'
                });
                const refreshToken = await json.sign({ userName }, process.env.REFRESH_PRIVATE_KEY, {
                    expiresIn: '1d'
                });
                await updaterefreshToken(findUser.username,refreshToken);
                res.status(200).cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 1000
                });
                res.json({ accessToken });
            } else {
                return errorGenerator(res, 401, "password is wrong.")
            }
        } catch (err) {
            errorGenerator(res, 500);
        }
    }
}
