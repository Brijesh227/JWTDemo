require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { connectDb } = require('./config/dbConnection');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { router: authRouter } = require('./Auth/index');
const port = process.env.PORT || 3000;

const app = express();
connectDb();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/auth", authRouter);

mongoose.connection.once('open',() => {
    app.listen(port, (err) => {
        if (err) console.log(err);
        console.log(`server listening on ${port}`);
    });
})
