const express = require('express');
const router = express.Router();
const { data } = require('../data/collectionData.json');
const { collections } = data

//collections index
router.get('/', (req, res) => {
    res.render('cards-index')
  })

//collection show
router.get('/:id', (req, res) => {
    res.locals.collections = collections[req.params.id].title
    res.render('card-show')
  })

module.exports = router;
