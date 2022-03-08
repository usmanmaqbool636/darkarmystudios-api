var router = require('express').Router();
var TodoController = require('../../controllers/todos') 
router.get("/all",TodoController.getAllTodos)
router.post("/add",TodoController.addTodo)
router.put("/:id", TodoController.updateTodo)
router.delete("/:id", TodoController.delTodo)
router.get("/:id", TodoController.getSingleTodo)

module.exports = router;
