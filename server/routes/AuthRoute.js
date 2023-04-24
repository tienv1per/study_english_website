const express = require('express');
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("Hello bro");
})

router.post("/register", (AuthController.registerUser));

router.post("/login", AuthController.loginUser);

module.exports = router;