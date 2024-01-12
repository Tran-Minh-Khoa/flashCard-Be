const Deck = require("../../../models/Deck");
const User = require("../../../models/User");
const { v4: uuidv4 } = require('uuid');

exports.test = async () => {
    const foundDecks = await Deck.find({
    deckId:[1,2], 
    // isActive: true,
    })
    return foundDecks
}
exports.getAllDeck = async () => {
    const foundDecks = await Deck.find({
    // isActive: true,
    })
    return foundDecks
}
exports.getAllUserDeck = async (user) => {
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
    console.log(keyword)
    const foundDecks = await Deck.find({
    title: { $regex: keyword, $options: "i" },
    // isActive: true,
    })
    return foundDecks
}
exports.addDeck = async (userId,deckId) => {
   const user = await User.findOne({id: userId})
   if(!user)
   {
       return null
   }
   user.Decks.push(deckId)
   await user.save()
   return user
}
exports.createDeck = async (userId,DeckCreate) => {
    
    const user = await User.findOne({id: userId})
    
    if(!user)
    {
        return null
    }
    // console.log(user)
    // console.log(DeckCreate)
    const newDeck = new Deck();
    newDeck.deckId =uuidv4().substring(0,6)
    newDeck.title = DeckCreate.title
    newDeck.description = DeckCreate.description
    newDeck.cards = DeckCreate.cards
    newDeck.userId = userId
    newDeck.creatorName = user.name
    await newDeck.save()
    // console.log(newDeck)
    // console.log('aaaaaaaaaaaa')
    console.log(user.Decks)
    Array.isArray(user.Decks) ? user.Decks.push(newDeck.deckId) : user.Decks = [newDeck.deckId]
    console.log(user.Decks)

    await user.save()

    return newDeck
}
exports.cardsDeckUpdate = async (userId,deckUpdate) => {
    console.log(deckUpdate)
    const deck = await Deck.findOne({deckId: deckUpdate.deckId})

    console.log('aaaaaaaaaaaaaa',deck)
    if(!deck)
    {
        console.log('aaaaaaaaaaaaaa')
        return null
    }
    if(deck.userId != userId)
    {
        console.log('bbbbbbbbbbbbbb')
        return null
    }
    deck.title= deckUpdate.title
    deck.description = deckUpdate.description
    deck.cards = deckUpdate.cards
    await deck.save()
    return deck
}