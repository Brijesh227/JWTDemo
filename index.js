const express = require('express');
const bodyParser = require('body-parser');
const { router: authRoute } = require('./Auth/index');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/auth", authRoute);

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`server listening on ${port}`);
});