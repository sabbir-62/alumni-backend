const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const DB = 'mongodb+srv://sabbir:sabbir5313@cluster0.tmgiqgv.mongodb.net/alumni'


const router = require('./routes/api');

app.use('/api/v1', router)

mongoose.connect(DB)
    .then(() => {
        console.log("Database Connection Successfully");
    })
    .catch((err) => {
        console.log(err);
    })

module.exports = app;