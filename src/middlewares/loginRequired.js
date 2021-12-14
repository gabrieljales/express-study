const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ['É necessário fazer login!']
    });
  }

  const [, token] = authorization.split(' '); // Vai vir: "Bearer(espaço)Token".  por isso o split no token

try {
  const dados = jwt.verify(token, process.env.SECRET_TOKEN);
  const { id, email } = dados;
  req.userId = id;
  req.userEmail = email;
  return next();

} catch (err) {
  return res.status(401).json({
    errors: ['Token expirado ou inválido']
  });
}
};
