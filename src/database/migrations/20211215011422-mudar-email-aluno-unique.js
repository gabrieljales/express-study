'use strict';
// Alterando o campo email da tabela aluno, agora email é um campo único
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('alunos', 'email',
    {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async () => {}
};
