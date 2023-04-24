const express = require('express');
const LessonsController = require("../controllers/LessonsController");

const router = express.Router();

router.get("/", LessonsController.getLessons);

router.get("/", LessonsController.getLesson);

router.post("/", LessonsController.createLesson);

router.put("/:id", LessonsController.updateLesson);

router.delete("/:id", LessonsController.deleteLesson);

module.exports = router;