const mongoose = require("mongoose");
const deckSchema = new mongoose.Schema({
  deckId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  creatorName: { type: String },
  cards: { type: Array },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  timeStamp: { type: Number, default: Date.now() },
});
const Deck = mongoose.model("Deck", deckSchema);
module.exports = Deck;
