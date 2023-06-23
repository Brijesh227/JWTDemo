const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.logger = (req, res, next) => {
    const data = `${uuidv4()} : ${Date.now()} => request from ${req.protocol + '://' + req.get('host') + req.originalUrl} with body ${JSON.stringify(req.body)}\n`;
    fs.appendFile(path.join(__dirname, "../logs", "logs.txt"), data, 'utf8', (error) => {
        if (error) {
            console.log(error);
        }
        next();
    });
}