const Deck = require("../../../models/Deck");
exports.test = async () => {
    const foundDecks = await Deck.find({
    deckId:[1,2], 
    // isActive: true,
    })
    return foundDecks
}
exports.getAllDeck = async () => {
    if(req.user)
    {
        if(req.user?.Decks.lengh>0)
        {
            const foundDecks = await Deck.find({
            id: { $in: req.user?.Decks },
            isActive: true,
            })
            return foundDecks
        }
        else
        {
            return []
        }
    }
}
exports.getDeckBySearch = async (keyword) => {
    const foundDecks = await Deck.find({
    name: { $regex: keyword, $options: "i" },
    isActive: true,
    })
    return foundDecks
}