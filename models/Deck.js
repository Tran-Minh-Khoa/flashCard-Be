const mongoose = require("mongoose");
const deckSchema =  new mongoose.Schema({
    deckId: { type: Number, required: true, unique: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    cards: {type : Array },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Number, default: Date.now},
    timeStamp: { type: Number , default: Date.now() },
    
});
const Deck = mongoose.model("Deck", deckSchema);
module.exports = Deck;