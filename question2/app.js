const express = require('express');
const app = express();
const numberRouter = require('./router/numberRouter');

app.use(express.json());
app.use('/', numberRouter);

module.exports = app;
