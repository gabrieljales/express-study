const User = require('../models/User')
const jwt = require('jsonwebtoken');

// Talvez um nome melhor seria login
exports.login = async (req, res) => {
  const { email = '', password = '' } = req.body; // Pegando email e senha (valor padrão vazio)

  if (!email || !password) { // Se o email OU o password n forem enviados, já devolve um erro
    return res.status(401).json({
      errors: ['Credenciais inválidas'],
    });
  }

  const user = await User.findOne({ where: { email } }) // É como se fosse { where: { email: email } }, verificar se o email existe

  if (!user) {
    return res.status(400).json({
      errors: ['Usuário não existe'],
    });
  }

  if(!(await user.passwordIsValid(password))) {
    return res.status(401).json({
      errors: ['Senha inválida, tente novamente!'],
    });
  }
  const { id } = user;
  const token = jwt.sign({ id, email }, process.env.SECRET_TOKEN, { // Enviando id e email como payload + chave secreta
    expiresIn: process.env.TOKEN_EXPIRATION,
  });

  res.json({
    token: token,
    user: { nome: user.nome, id, email }
  });
};
