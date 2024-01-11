const express = require('express');
const router = express.Router();
const Controller = require('./deck.controller');
router.get('/test',Controller.test)
router.get('/',Controller.getAllDeck)
router.get('/search',Controller.getDeckBySearch)
router.post('/add',Controller.addDeck)
router.post('/create',Controller.createDeck)
router.post('cardsDeckUpdate',Controller.cardsDeckUpdate)
module.exports = router