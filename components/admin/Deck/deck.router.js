const express = require("express");
const router = express.Router();
const controller = require("./deck.controller");

router.get("/", controller.DeckPage);
router.put("/disable/:deckId", controller.DisableDeck);
router.put("/enable/:deckId", controller.EnableDeck);
router.delete("/delete/:deckId", controller.DeleteDeck);
module.exports = router;