exports.addProject = async (req, res, next) => {
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
exports.getAllProjects = async (req, res, next) => {
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

exports.getSingleProject = async (req, res, next) => {
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

exports.updateProject = async (req, res, next) => {
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


exports.delProject = async (req, res, next) => {
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