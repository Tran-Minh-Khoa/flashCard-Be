const express = require('express');
const router = express.Router();
const Controller = require('./deck.controller');
router.get('/test',Controller.test)
router.get('/',Controller.getAllDeck)
router.get('/search',Controller.getDeckBySearch)
module.exports = router