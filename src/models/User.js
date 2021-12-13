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
      user.password_hash = await bcryptjs.hash(user.password, 10);
    })

    return this;
  }
}

module.exports = User;