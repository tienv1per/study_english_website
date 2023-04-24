const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const AuthRoute = require("./routes/AuthRoute");
const CardsRoute = require("./routes/CardsRoute");
const LessonsRoute = require("./routes/LessonsRoute");

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

const connect = async () => {
    try {
        await mongoose.connect(MONGO);
        console.log("Connected to mongoDB");
    }
    catch(err) {
        console.log(err.message);
        throw err;
    }
}

app.use(cors());
app.use(express.json());

app.use("/auth", AuthRoute);
app.use("/cards", CardsRoute);
app.use("/lessons", LessonsRoute);

app.listen(PORT, (req, res) => {
    connect();
    console.log(`Listening on ${PORT}`);
});