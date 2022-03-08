exports.addTodo = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {},
      msg: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};
exports.getAllTodos = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {},
      msg: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getSingleTodo = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {},
      msg: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {},
      msg: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};


exports.delTodo = async (req, res, next) => {
    try {
      return res.status(200).json({
        success: true,
        data: {},
        msg: "ok",
        status: 200,
      });
    } catch (error) {
      return next(error);
    }
  };