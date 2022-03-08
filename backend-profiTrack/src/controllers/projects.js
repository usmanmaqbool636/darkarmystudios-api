const ProjectService = require("../services/projects");

exports.addProject = async (req, res, next) => {
  try {
    const { body } = req;
    const project = ProjectService.newProject(body);
    // req.user._id from middleware
    // project.createdBy = req.user._id;
    await project.save();

    return res.status(200).json({
      success: true,
      data: {
        project
      },
      msg: "project Created Successfully",
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
