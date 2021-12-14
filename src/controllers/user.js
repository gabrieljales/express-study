const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    const novoUser = await User.create(req.body); // Tenta criar um user com os dados da requisição
    const { id, nome, email } = novoUser; // Objeto com os dados que serão mostrados ao criar um usuário
    return res.json({ id, nome, email });

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
    const users = await User.findAll({ attributes: ['id', 'nome', 'email'] }); // todos os users da base de dados (porém, somentes esses atributos)
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

    const { id, nome, email } = user;
    return res.json({ id, nome, email }); // Retornando somente dados não sensíveis do user

  } catch (err) {
    return res.json(null);
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId); // userId do middleware loginRequired

    if (!user) { // Caso o usuário não exista
      return res.status(400).json({
        errors: ['Usuário não existe.'],
      });
    }

    const novosDados = await user.update(req.body); // Atualizando user
    const { id, nome, email } = novosDados;
    return res.json({ id, nome, email });

  } catch (err) {
    return res.status(400).json({
      errors: err.errors.map((err) => err.message),
    });
  }
};

// OBS: O delete desse projeto permite o usuário se "auto deletar"
// Em um caso real, seria melhor uma flag "ativo: true || false"
exports.delete = async (req, res) => {

  try{
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não existe'],
      });
    }

    await user.destroy(); // Deleta o user
    return res.json(null); // Retorna null quando o usuário que foi deletado (NÃO sei se é o correto a se fazer)
  } catch (err) {
    return res.status(400).json({
      errors: err.errors.map((err) => err.message),
    });
  }
};

// DICA: Sempre que for trabalhar com a base de dados, usaremos async await
// Precisamos esperar que o que estamos esperando seja executado e retorne
