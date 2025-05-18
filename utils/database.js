const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/notification";

const connectDB = async() => {
    try {
        await mongoose.connect(URI);
        console.log("Database successfully connected");
    } catch (error) {
        console.error("Database connection failed");
        process.exit(0);
    }
}

module.exports = connectDB;