const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ['É necessário fazer login!']
    });
  }

  const [, token] = authorization.split(' '); // Vai vir: "Bearer(espaço)Token".  por isso o split no token

try {
  const dados = jwt.verify(token, process.env.SECRET_TOKEN); // Dados no payload do token
  const { id, email } = dados; // Extraindo id e email que vieram no payload

  // Verificando é o mesmo usuário (caso tenha atualizado o email, o token não será mais válido)
  const user = await User.findOne({
    where: {
      id, // É como se fosse id: id, email: email (mas não precisa repetir)
      email,
    },
  });

  if (!user) { // Se o usuário atualizou seu EMAIL, ele terá que realizar login novamente
    return res.status(401).json({
      errors: ['Usuário inválido']
    });
  }

  // id e email do usuário agora estão disponíveis e são conhecidos no sistema
  req.userId = id;
  req.userEmail = email;
  return next(); // Continua para a response

} catch (err) {
  return res.status(401).json({
    errors: ['Token expirado ou inválido']
  });
}
};
