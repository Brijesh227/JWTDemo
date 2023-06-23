const bcrypt = require('bcrypt');
const User = require('../../model/userSchema');
require('dotenv').config();
const { errorGenerator } = require('../../common/utility/errorGenerator');
const { generateToken } = require("../../common/controllerFunction");

const updateUser = async (username,refreshTokenArray) => {
    try {
        await User.updateOne(
            {username},
            {
                $set: {
                    $refreshToken: refreshTokenArray
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
    const foundUser = await User.findOne({ username: userName }).exec();
    if (!foundUser) {
        return errorGenerator(res, 401, "can't find user.")
    }
    try {
        const isPasswordMatched = await bcrypt.compare(password, foundUser.password);
        if (isPasswordMatched) {
            let cookieRefreshToken = req?.cookies?.refreshToken;
            let refreshTokenArray = cookieRefreshToken ? foundUser.refreshToken.filter(rt => rt !== cookieRefreshToken) : foundUser.refreshToken;

            if(cookieRefreshToken) {
                const foundUserByRefreshToken = User.find({ refreshToken: cookieRefreshToken }).exec();

                if(!foundUserByRefreshToken) {
                    foundUser.refreshTokenArray = [];
                    await foundUser.save();
                    return errorGenerator(res,403);
                }
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 1000
                }); // secure: true
            }

            const accessToken = await generateToken(
                { userName: foundUser[username] },
                process.env.ACCESS_PRIVATE_KEY,
                { expiresIn: '1h'}
            );
            const newRefreshToken = await generateToken(
                { userName: foundUser[username] },
                process.env.REFRESH_PRIVATE_KEY,
                { expiresIn: '1d' }
            );
            
            await updateUser(foundUser[username],[...refreshTokenArray,newRefreshToken]);

            res.status(200).cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000,
                
            }); // secure: true
            res.json({ accessToken });
        } else {
            return errorGenerator(res, 401, "password is wrong.")
        }
    } catch (err) {
        errorGenerator(res, 500);
    }
}
