const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    const novoUser = await User.create(req.body); // Tenta criar um user com os dados da requisição
    res.json(novoUser);
  } catch (err) {

    console.log(err)
    res.status(400).json({
      // Dentro do erro (err), existe um array errors com uma chave message (errors.message)
      // Então retornamos esses erros em um objeto, com uma chave errors
      // Quem consumir a API verá que teve um erro, já que essa chave "errors" foi retornada
      errors: err.errors.map((err) => err.message),
    });
  }
};

