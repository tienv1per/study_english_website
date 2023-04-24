const express = require('express');
const CardsController = require("../controllers/CardsController");

const router = express.Router();

router.get("/", CardsController.getCards);

router.get("/:id", CardsController.getCard);

router.post("/", CardsController.createCard);

router.put("/:id", CardsController.updateCard);

router.delete("/:id", CardsController.deleteCard);

module.exports = router;