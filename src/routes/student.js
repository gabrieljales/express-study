const router = require('express').Router();
const studentController = require('../controllers/student');
const loginRequired = require('../middlewares/loginRequired');

// Prefixo /students
router.get('/', loginRequired, studentController.index);
router.post('/', loginRequired, studentController.create);
router.get('/:id', loginRequired, studentController.show);
router.put('/:id', loginRequired, studentController.update);
router.delete('/:id', loginRequired, studentController.delete);

module.exports = router;
