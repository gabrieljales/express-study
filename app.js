// Configurações
const dotenv = require('dotenv');
dotenv.config();

// Models
require('./src/database/index');

const express = require('express');
const app = express();

// Rotas
const indexRouter = require('./src/routes/index');
app.use('/', indexRouter);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


module.exports = app;
