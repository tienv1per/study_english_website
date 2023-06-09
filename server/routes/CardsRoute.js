const express = require('express');
const CardsController = require("../controllers/CardsController");
const verify = require("../controllers/verify");

const router = express.Router();

router.get("/", CardsController.getCards);

router.get("/detail/:id", CardsController.getCard);

router.get("/:lessonId", CardsController.getCardsInLesson);

router.post("/:lessonId", verify.verifyToken, CardsController.createCard);

router.put("/:id", verify.verifyToken, CardsController.updateCard);

router.delete("/:id", verify.verifyToken, CardsController.deleteCard);

module.exports = router;