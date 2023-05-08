const express = require('express');
const LessonsController = require("../controllers/LessonsController");
const verify = require("../controllers/verify");

const router = express.Router();

router.get("/", LessonsController.getLessons);

router.get("/:id", LessonsController.getLesson);

router.post("/", LessonsController.createLesson);

router.put("/:id", LessonsController.updateLesson);

router.delete("/:id", verify.verifyToken, LessonsController.deleteLesson);

module.exports = router;