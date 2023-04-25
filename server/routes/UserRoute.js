const express = require('express');
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getUser);

router.put("/:id", UserController.finishLesson);

router.post("/register", (UserController.registerUser));

router.post("/login", UserController.loginUser);

module.exports = router;