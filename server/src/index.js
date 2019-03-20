const log = require('./services/logger');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(
  'mongodb://localhost:27017/todos-app',
  { useCreateIndex: true, useNewUrlParser: true },
  err => {
    if (err) return log.err(err);
    return log.msg(`Connected to MongoDB on port ${colors.blue('27017')}`);
  }
);

require('./models/todo');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/todo.routes'));

app.listen(process.env.PORT || 8000, err => {
  if (err) {
    log.err(err);
  }
  log.msg(`Server Listening on port ${colors.blue(process.env.PORT || 8000)}`);
});
