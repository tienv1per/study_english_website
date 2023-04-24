const Card = require("../models/cardsModel");

module.exports.createCard = async(req, res, next) => {
    const newCard = new Card(req.body);
    
}

module.exports.updateCard = async(req, res, next) => {

}

module.exports.deleteCard = async(req, res, next) => {

}

module.exports.getCard = async (req, res, next) => {

}

module.exports.getCards = async(req, res, next) => {

}