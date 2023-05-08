const express = require('express');
const CardsController = require("../controllers/CardsController");
const verify = require("../controllers/verify");

const router = express.Router();

router.get("/", CardsController.getCards);

router.get("/detail/:id", CardsController.getCard);

router.get("/:lessonId", CardsController.getCardsInLesson);

router.post("/:lessonId", CardsController.createCard);

router.put("/:id", CardsController.updateCard);

router.delete("/:id", CardsController.deleteCard);

module.exports = router;