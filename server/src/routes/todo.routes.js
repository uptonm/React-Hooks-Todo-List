const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo');

router.get('/todos', controller.getTodos);
router.get('/todos/:id', controller.getTodo);
router.post('/todos', controller.postTodo);
router.put('/todos/:id', controller.putTodo);
router.delete('/todos/:id', controller.deleteTodo);

module.exports = router;
