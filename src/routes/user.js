const router = require('express').Router();
const userController = require('../controllers/user');

// Prefixo das rotas: /users/
router.post('/', userController.create);

module.exports = router;
