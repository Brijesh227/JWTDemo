const Jwt = require('jsonwebtoken');
require('dotenv').config();
const { errorGenerator } = require('../common/utility/errorGenerator');

exports.verifyJwtToken = async function (req, res, next) {
    try {
        const authHeader = req.header['authorization'] || req.header['Authorization'];
        if (!authHeader?.startsWith("Bearer ")) {
            return errorGenerator(res,401);
        }
        const token = authHeader.split(" ")[1];
        if(!token) {
            return errorGenerator(res,401);
        }
        const isVerifiedUser = await Jwt.verify(token,process.env.ACCESS_PRIVATE_KEY);
        if(isVerifiedUser) {
            next()
        } else {
            return errorGenerator(res,401);
        }
    } catch(err) {
        console.log(err);
    }
}