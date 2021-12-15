// Arquivo para colocar todos os models
const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Aluno = require('../models/Aluno');
const User = require('../models/User');

const models = [Aluno, User]; // Todos os models criados são adicionados aqui

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

// module.exports = models;
