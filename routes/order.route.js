const { Router } = require('express');
const router = Router();

const order = require('../controllers/order.controller');
const download = require('../controllers/download.controller');
const verifyUser = require('../middlewares/verifyUser');

router.get('/order/:user_id', verifyUser.checkForLogIn, order.order);
router.post('/order/:user_id', order.updateInfo);
router.get('/order/:user_id/submit', download.order);


module.exports = router;