const ServiceDeck = require('./deck.service');
exports.test = async (req, res, next) => {
    try {
        console.log(req.session)
        const result = await ServiceDeck.test();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.getAllDeck = async (req, res, next) => {
    try {
        if(!req.user)
        {
            res.status(400).send('user not found');
        }
        const result = await ServiceDeck.getAllDeck(req.user);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}
exports.getDeckBySearch = async (req, res, next) => {
    try {
        const keyword = req.query.keyWord;
        const result = await ServiceDeck.getDeckBySearch(keyword);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}