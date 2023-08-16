const express = require('express');
const app = express();
const trainRouter = require('./router/trainRouter');

app.use(express.json());
app.use('/api/v1', trainRouter);

module.exports = app;
