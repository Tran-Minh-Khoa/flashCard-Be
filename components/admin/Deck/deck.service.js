
const Deck = require("../../../models/Deck");
const User = require("../../../models/User");
exports.GetAllDecks = async () => {
    const decks = await Deck.find();
    return decks;
}
exports.DisableDeck = async (deckID) => {
    try {
      const updatedDeck = {
        isActive: false,
      };
  
      const result = await Deck.findOneAndUpdate(
        { deckId: deckID },
        { $set: updatedDeck },
        { new: true }
      );
 
      return result;
    } catch (error) {
      console.error("Error disabling set:", error);
      throw error;
    }
  };
exports.EnableDeck = async (deckId) => {
    try {
      const updatedDeck = {
        isActive: true,
      };
  
      const result = await Deck.findOneAndUpdate(
        { deckId: deckId },
        { $set: updatedDeck },
        { new: true }
      );
  
      return result;
    } catch (error) {
      console.error("Error enabling set:", error);
      throw error;
    }
  };
  
  exports.DeleteDeck = async (deckID) => {
    try {
    const decks = await Deck.findOne({deckId: deckID});

      const result = await Deck.findOneAndDelete({ deckId: deckID });
  
      if (!result) {
        throw new Error("Set not found");
      }
      const user = await User.findOne({id: decks.userId});
      console.log(user)
      user.Decks = user.Decks.filter(id => id != deckID)
      await user.save()
  
      return result;
    } catch (error) {
      console.error("Error deleting set:", error);
      throw error;
    }
  };
  