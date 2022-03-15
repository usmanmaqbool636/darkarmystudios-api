var router = require("express").Router();
var TodoController = require("../../controllers/todos");
const { addTodoValidation } = require("../../Validator");
router.get("/all", TodoController.getAllTodos);
router.post("/add-tasks", addTodoValidation, TodoController.addTodo);
router.put("/update-task/:id", TodoController.updateTodo);
router.patch("/complete-task/:id", TodoController.completeTaskByValue);
router.delete("/delete-task/:id", TodoController.delTodo);
router.get("/:id", TodoController.getSingleTodo);

module.exports = router;
