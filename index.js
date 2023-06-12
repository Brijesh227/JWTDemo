const express = require('express');
const bodyParser = require('body-parser');
const { router: authRouter } = require('./Auth/index');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use("/auth", authRouter);

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`server listening on ${port}`);
});