const jwt = require('jsonwebtoken');

async function generateToken(payload,hashKey,optionObject) {
    return await jwt.sign(payload, hashKey, optionObject);
}

module.exports = {
    generateToken
}