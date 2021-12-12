const router = require('express').Router();
const indexController = require('../controllers/index');

router.get('/', indexController.index);

module.exports = router;
