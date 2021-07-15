const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('pages/auth'));
router.get('/error', (req, res) => res.send('Something went wrong.'));

module.exports = router;