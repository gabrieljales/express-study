const { Sequelize, Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: { // Nome deve ter entre 3 e 255 caracteres
          len: {
            args: [3, 255],
            msg: 'Nome inválido! Dica: Insira um nome com no mínimo 3 caracteres e no máximo 255.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
            msg: 'Esse email já está cadastrado no sistema!',
          },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL, // Virtual: Esse campo não é criado no BD
        defaultValue: '',
        validate: {
          len: {
            args: [8,],
            msg: 'Senha inválida! Dica: Sua senha deve ter pelo menos 8 caracteres.'
          },
        },
      },
    },
    {
      sequelize,
    });
    // Antes de salvar um usuário, vamos criptografar a senha dele
    // E usamos async para trabalharmos com a promise que o bcryptjs gera
    this.addHook('beforeSave', async user => {
      if (user.password) { // Se recebermos uma senha, então transforma em hash (vai que em um update o usuário não atualizasse a senha, ele tentaria criptografar null)
        user.password_hash = await bcryptjs.hash(user.password, 10);
      }
    });
    return this;
  }

  passwordIsValid(password) { // Método usado no controller de autenticação (auth) para verificar se a senha é válida (igual a registrada no banco)
    return bcryptjs.compare(password, this.password_hash); // Retorna uma promise
  }
}

module.exports = User;
