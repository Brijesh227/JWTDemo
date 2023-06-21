const jwt = require('jsonwebtoken');
require('dotenv').config();
const { errorGenerator } = require('../common/utility/errorGenerator');
const { generateToken } = require("../common/controllerFunction");

exports.refreshTokenHandler = async function (req, res) {
    const userRefreshToken = req?.cookie?.refreshToken;
    if (!userRefreshToken) {
        return errorGenerator(res, 401);
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000
    }); // secure: true

    const foundUser = await User.findOne({ refreshToken: userRefreshToken }).exec();
    if (!foundUser) {
        jwt.verify(
            userRefreshToken,
            process.env.REFRESH_PRIVATE_KEY,
            async (err, decoded) => {
                if (err) return errorGenerator(res, 403);
                // Delete refresh tokens of hacked user
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                hackedUser.refreshToken = [];
                await hackedUser.save();
            }
        )
        return errorGenerator(res, 403);
    }

    const refreshTokenArray = foundUser.refreshToken.filter(rt => rt !== userRefreshToken);

    jwt.verify(
        userRefreshToken,
        process.env.REFRESH_PRIVATE_KEY,
        async (err, decode) => {
            if (err) {
                // expired refresh token
                foundUser.refreshToken = [...refreshTokenArray];
                await foundUser.save();
            }

            if (err || foundUser.userName !== decode.username) {
                return errorGenerator(res, 403);
            }

            const accessToken = await generateToken(
                { userName: decode.username },
                process.env.ACCESS_PRIVATE_KEY,
                { expiresIn: '1h' }
            );
            const newRefreshToken = await generateToken(
                { userName: decode.username },
                process.env.REFRESH_PRIVATE_KEY,
                { expiresIn: '1d' }
            );

            foundUser.refreshToken = [...refreshTokenArray, newRefreshToken];
            await foundUser.save();

            res.status(200).cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000
            }); // secure: true
            res.json({ accessToken });
        }
    );
}