const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    const novoUser = await User.create(req.body); // Tenta criar um user com os dados da requisição
    return res.json(novoUser);

  } catch (err) {
    return res.status(400).json({
      // Dentro do erro (err), existe um array errors com uma chave message (errors.message)
      // Então retornamos esses erros em um objeto, com uma chave errors
      // Quem consumir a API verá que teve um erro, já que essa chave "errors" foi retornada
      errors: err.errors.map((err) => err.message),
    });
  }
};

exports.list = async (req, res) => {
  try {
    const users = await User.findAll(); // todos os users da base de dados
    return res.json(users);

  } catch (err) {
    return res.json(null);
    // Segundo o cara do curso (motivo null): Não mostrar o erro ao usuário final, se tiver um erro o programa quebrou e não foi uma requisição incorreta
  }
};

exports.show = async (req, res) => {
  try {
    //const { id } = req.params; // invés de id = req.params.id, usamos destructuring
    const user = await User.findByPk(req.params.id);
    return res.json(user);

  } catch (err) {
    return res.json(null);
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        errors: ['ID não especificado.'],
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) { // Caso o usuário não exista
      return res.status(400).json({
        errors: ['Usuário não existe.'],
      });
    }

    const updatedUser = await user.update(req.body); // Atualizando user
    return res.json(updatedUser);

  } catch (err) {
    return res.status(400).json({
      errors: err.errors.map((err) => err.message),
    });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        errors: ['ID não especificado.'],
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não existe.']
      });
    }

    await user.destroy();
    return res.json(user); // Retorna o usuário que foi deletado (NÃO sei se é o correto a se fazer)

  } catch (err) {
    return res.status(400).json({
      errors: err.errors.map((err) => err.message),
    });
  }
};

// DICA: Sempre que for trabalhar com a base de dados, usaremos async await
// Precisamos esperar que o que estamos esperando seja executado e retorne
