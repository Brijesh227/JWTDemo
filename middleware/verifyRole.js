require('dotenv').config();
const { errorGenerator } = require('../common/utility/errorGenerator');

exports.verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req?.roles) return errorGenerator(res,401);
            const rolesArray = [...allowedRoles];
            const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
            if (!result) return errorGenerator(res,401);
            next();
        } catch(err) {
            console.log(err);
        }
    }
}