const router = require('express').Router();
const userController = require('../controllers/user');
const loginRequired = require('../middlewares/loginRequired');

// Prefixo das rotas: /users/

// Essas duas rotas só fazem sentido para um Super Admin ou algo assim
//router.get('/', userController.list); // --> Lista todos os usuários
//router.get('/:id', userController.show); // --> Mostra os detalhes de um usuário

router.post('/', userController.create); // --> Cria um usuário (aberto para todos)
router.put('/', loginRequired, userController.update); // --> Atualiza um usuário
router.delete('/', loginRequired, userController.delete); // --> Deleta um usuário

module.exports = router;
