const Deck = require("../../../models/Deck");
exports.test = async () => {
    const foundDecks = await Deck.find({
    deckId:[1,2], 
    // isActive: true,
    })
    return foundDecks
}
exports.getAllDeck = async (user) => {
    if(user)
    {
        console.log(typeof(user.Decks))
        console.log(Array.isArray(user.Decks))
        if(Array.isArray(user.Decks) && user.Decks.length > 0)
        {
            console.log('aaaaaaaaa')
            const foundDecks = await Deck.find({
            deckId: user.Decks,
            // isActive: true,
            })
            return foundDecks
        }
        else
        {
            console.log('bbbbbbbb')
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