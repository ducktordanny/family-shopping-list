const express = require('express');
const router = express.Router();

// basic router
router.get('/', (req, res) => res.render('pages/auth'));
router.get('/error', (req, res) => res.send('Something went wrong.'));

module.exports = router;
