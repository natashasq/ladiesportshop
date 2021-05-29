const { Router } = require('express');
const router = Router();

const cart = require('../controllers/cart.controller');
const verifyUser = require('../middlewares/verifyUser')

router.post('/item/:id', verifyUser.checkForLogIn, cart.addToCart);
router.get(['/cart/:user_id', '/cart'], verifyUser.checkForLogIn, cart.cart);
router.post('/cart/:id', cart.deleteFromCart);
// router.get('/cart', (req, res) => {
//     res.redirect('/login-view')
// });

module.exports = router;