const { Router } = require('express');
const router = Router();

const item = require('../controllers/item.controller')

router.get('/item/:id', item.item);

module.exports = router;