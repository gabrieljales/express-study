'use strict';

const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.bulkInsert('users',
    [{
      nome: 'John Doe',
      email: 'johnd@gmail.com',
      password_hash: await bcryptjs.hash('12345678', 10), // await por retorna uma promise
      created_at: new Date(), // Data atual
      updated_at: new Date(),
    },
    {
      nome: 'Joana Doe',
      email: 'joanad@gmail.com',
      password_hash: await bcryptjs.hash('12345678', 10), // await por retorna uma promise
      created_at: new Date(), // Data atual
      updated_at: new Date(),
    },
  ],
    {}
    );
  },

  down: async () => {
  }
};
