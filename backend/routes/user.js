const router = require('express').Router();
const controller = require('@controllers/user');
const auth = require('@middleware/auth');

router.get('/', auth, controller.get);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/validate', controller.validate);

module.exports = router;