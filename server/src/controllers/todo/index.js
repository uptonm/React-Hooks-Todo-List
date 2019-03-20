const mongoose = require('mongoose');
const todos = mongoose.model('todos');

exports.getTodos = async (req, res) => {
  const exists = await todos.find({});
  if (!exists || exists.length === 0) {
    return res.status(404).send({ Error: 'No Requests Found' });
  }

  return res.status(200).send(exists);
};

exports.getTodo = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ Error: "The route parameter 'id' is required for this route" });
  }

  const exists = await todos.findById(req.params.id);
  if (!exists || exists.length === 0) {
    return res.status(404).send({ Error: `Request ${req.params.id} not found` });
  }

  return res.status(200).send(exists);
};

exports.postTodo = async (req, res) => {
  let errors = validateBody(req);

  let todo = {
    title: req.body.title,
    completed: false
  };
  if (errors.length === 0) {
    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.dueDate) {
      todo.dueDate = req.body.dueDate;
    }
    if (req.body.importance) {
      todo.importance = req.body.importance;
    } else {
      todo.importance = 0;
    }
    const created = await new todos({ ...todo }).save();
    return res.status(200).send(created);
  } else {
    return res.status(400).send({
      Error: {
        message: 'The following fields have errors',
        fields: errors
      }
    });
  }
};

exports.putTodo = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ Error: "The route parameter 'id' is required for this route" });
  }

  let errors = validateBody(req);
  if (errors[0].includes('title')) {
    errors.splice(0);
  }

  let todo = {};
  if (errors.length === 0) {
    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.dueDate) {
      todo.dueDate = req.body.dueDate;
    }
    if (req.body.importance) {
      todo.importance = req.body.importance;
    }
    if (req.body.completed) {
      todo.completed = req.body.completed;
    }
    await todos.findByIdAndUpdate(req.params.id, { ...todo });
    return res.status(200).send(todo);
  } else {
    return res.status(400).send({
      Error: {
        message: 'The following fields have errors',
        fields: errors
      }
    });
  }
};

exports.deleteTodo = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ Error: "The route parameter 'id' is required for this route" });
  }
  const exists = await todos.findById(req.params.id);

  if (!exists || exists.length === 0) {
    return res.status(404).send({ Error: `Todo ${req.params.id} was not found` });
  }

  await todos.findByIdAndRemove(req.params.id);
  return res.status(200).send({ Message: `Todo ${req.params.id} was removed from the database` });
};

validateBody = req => {
  let errors = [];
  // Validate required field 'title'
  if (!req.body.title || req.body.title.length === 0) {
    errors.push('title');
  }
  // Validate optional field 'date'
  if (req.body.dueDate) {
    if (isNaN(new Date(req.body.dueDate))) {
      errors.push('dueDate');
    }
  }
  // Validate optional field 'importance'
  if (req.body.importance) {
    if (isNaN(req.body.importance) || ![0, 1, 2, 3].includes(parseInt(req.body.importance))) {
      errors.push('importance');
    }
  }

  return errors;
};
