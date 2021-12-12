const Aluno = require('../models/Aluno');

exports.index = async (req, res) => {
  const novoAluno = await Aluno.create({
    nome: 'Gabriel',
    sobrenome: 'Jales',
    email: 'gabriel@gmail.com',
    idade: 21,
    peso: 59,
    altura: 1.65,
  });
  res.json({novoAluno});
};
