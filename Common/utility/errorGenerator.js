exports.errorGenerator = function (res, code, msg) {
    if (res && code && msg) {
        res.status(code).send({ msg });
    } else {
        res.sendStatus(code);
    }
}