require("dotenv").config();
const connectDB = require("./utils/database");
const notificationRoute = require("./routes/notificationRoute");
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.use('/', notificationRoute);

const PORT = 5000;

connectDB().then( () => {
    app.listen( PORT, () => {
        console.log(`Server is active at port: ${PORT}`);
    });
});

module.exports = app;
