const TodoService = require("../services/todos");

exports.addTodo = async (req, res, next) => {
  try {
    const { body } = req;
    const todo = TodoService.newTodo(body);
    // TODO discuss with @abdulmohiz
    // req.user._id from middleware
    // todo.createdBy = req.user._id;
    await todo.save();

    return res.status(200).json({
      success: true,
      data: {
        todo,
      },
      message: "todo Created Successfully",
      status: 200,
    });
  } catch (error) {
    error.code = 404;
    return next(error);
  }
};
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await TodoService.getTodos({});
    return res.status(200).json({
      success: true,
      data: {
        todos,
      },
      message: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getSingleTodo = async (req, res, next) => {
  try {
    const todo = await TodoService.getTodo({ _id: req.params.id });
    console.log(todo);
    if (!todo)
      return next({
        success: false,
        data: {},
        message: "Todo Not found",
        status: 404,
      });
    return res.status(200).json({
      success: true,
      data: {
        todo,
      },
      message: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await TodoService.updateTodo({ _id: req.params.id }, req.body);
    if (!todo)
      return next({
        success: false,
        data: {},
        message: "Todo Not found",
        status: 404,
      });
    return res.status(200).json({
      success: true,
      data: {
        todo,
      },
      message: "Task Updated Successfully",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};
exports.completeTaskByValue = async (req, res, next) => {
  try {
    const updateData = {};
    if(req.body.isCompleted == "true" || req.body.isCompleted == true ){
      updateData.isCompleted = req.body.isCompleted;  
      updateData.completedAt = Date.now();
    }else{
      updateData.isCompleted = req.body.isCompleted; 
      updateData.completedAt = ""
    }
    const todo = await TodoService.updateTodo(
      // Add user field in query
      { _id: req.params.id },
      updateData
    );
    if (!todo)
      return next({
        success: false,
        data: {},
        message: "Todo Not found",
        status: 404,
      });
    return res.status(200).json({
      success: true,
      data: {
        todo
      },
      message: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

exports.importantTaskByValue = async (req, res, next) => {
  try {
    const updateData = {};
    updateData.isImportant = req.body.isImportant;  
    // if(req.body.isImportant == "true" || req.body.isImportant == true ){
    //   updateData.isImportant = req.body.isImportant;  
    // }else{
    //   updateData.isImportant = req.body.isImportant;  
    // }
    const todo = await TodoService.updateTodo(
      // Add user field in query
      { _id: req.params.id },
      updateData
    );
    if (!todo)
      return next({
        success: false,
        data: {},
        message: "Todo Not found",
        status: 404,
      });
    return res.status(200).json({
      success: true,
      data: {
        todo
      },
      message: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};
exports.delTodo = async (req, res, next) => {
  try {
    const todo = await TodoService.updateTodo(
      { _id: req.params.id },
      {
        $set: {
          deletedAt: Date.now(),
          // deletedBy:
          isDeleted: true,
        },
      }
    );
    if (!todo)
      return next({
        success: false,
        data: {},
        message: "Todo Not found",
        status: 404,
      });

    return res.status(200).json({
      success: true,
      data: {
        todo,
      },
      message: "Task Deleted",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};
