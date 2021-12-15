const Aluno = require('../models/Aluno');

exports.index = async (req, res) => {
  const alunos = await Aluno.findAll();
  res.json(alunos);
};

exports.create = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);

    return res.json(aluno);

  } catch (err) { // Capturando erros
    return res.status(400).json({
      errors: err.errors.map(err => err.message),
    });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) { // Conferindo se o ID foi passado
      return res.status(400).json({
        errors: ['Faltando ID'],
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) { // Conferindo se o aluno existe
      return res.status(400).json({
        errors: ['Aluno não existe'],
      });
    }

    return res.json(aluno);

  } catch (err) { // Capturando erros
    return res.status(400).json({
      errors: err.errors.map(err => err.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({
        errors: ['Faltando ID'],
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(400).json({
        errors: ['Aluno não existe'],
      });
    }

    const alunoAtualizado = await aluno.update(req.body);
    return res.json(alunoAtualizado);

  } catch (err) {
    return res.status(400).json({
      errors: err.errors.map(err => err.message),
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({
        errors: ['Faltando ID'],
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(400).json({
        errors: ['Aluno não existe'],
      });
    }

    await aluno.destroy();
    return res.json({
      apagado: true,
    });

  } catch (err) {
    return res.status(400).json({
      errors: err.errors.map(err => err.message),
    });
  }
};
