const router = require('express').Router();
const userController = require('../controllers/user');

// Prefixo das rotas: /users/
router.post('/', userController.create); // --> Cria um usuário
router.get('/', userController.list); // --> Lista todos os usuários
router.get('/:id', userController.show); // --> Mostra os detalhes de um usuário
router.put('/:id', userController.update); // --> Atualiza um usuário
router.delete('/:id', userController.delete); // --> Deleta um usuário

module.exports = router;
