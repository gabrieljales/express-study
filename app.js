// Configurações
const dotenv = require('dotenv');
dotenv.config();

// Models
require('./src/database/index');

const express = require('express');
const app = express();

// Middlewares -- OBS: Declarar isso antes das rotas!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
const indexRouter = require('./src/routes/index');
app.use('/', indexRouter);
const userRouter = require('./src/routes/user');
app.use('/users/', userRouter);
const authRouter = require('./src/routes/auth');
app.use('/login', authRouter);

module.exports = app;
