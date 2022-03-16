const { TodosModel } = require("../models");

class TodosService {
  newTodo(request) {
    return new TodosModel(request);
  }

  getTodo(req) {
    return TodosModel.findOne(req);
  }

  updateTodo(req, data) {
    return TodosModel.findOneAndUpdate(req, data, { new: true });
  }

  getTodos(req) {
    return TodosModel.find(req).populate("project","title");;
  }
}

module.exports = new TodosService();
