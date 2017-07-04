const express = require('express');
const router = express.Router();

//homepage
router.get('/', (req, res) => {
    res.locals.prompt = "Some database values"
    res.render('index')
  })

module.exports = router;
