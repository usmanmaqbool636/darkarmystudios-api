var router = require("express").Router();
var TodoController = require("../../controllers/todos");
const { addTodoValidation } = require("../../Validator");
router.get("/all", TodoController.getAllTodos);
router.post("/add", addTodoValidation, TodoController.addTodo);
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.delTodo);
router.get("/:id", TodoController.getSingleTodo);

module.exports = router;
