const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');

const authController = require('../controllers/auth.controller');
const verify = require('../middlewares/verifyUser')

router.get('/login-view', authController.loginView);
router.get('/signup-view', authController.signupView);
router.post('/login', verify.login ,authController.login);
router.post('/signup',[
    body('email').isEmail(),
body('password').isLength({ min: 5, max: 15 }),
body('confirm_password').custom((confirm_password, {req}) => {
    if (confirm_password !== req.body.password) {
        throw new Error ('Password confirmation does not match password')
    }
    return true;
}), verify.signup], authController.signup);
router.get('/logout', authController.logout);

module.exports = router;