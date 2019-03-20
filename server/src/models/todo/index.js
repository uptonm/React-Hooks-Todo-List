const mongoose = require('mongoose');

const todoModel = new mongoose.Schema({
  title: String,
  completed: Boolean,
  dueDate: String,
  importance: Number
});

const todo = mongoose.model('todos', todoModel);
module.exports = todo;
