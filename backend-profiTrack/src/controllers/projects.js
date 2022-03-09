const ProjectService = require("../services/projects");

exports.addProject = async (req, res, next) => {
  try {
    // TODO add Validator here
    const { body } = req;
    const project = ProjectService.newProject(body);
    // TODO discuss with @abdulmohiz
    // req.user._id from middleware
    // project.createdBy = req.user._id;
    await project.save();

    return res.status(200).json({
      success: true,
      data: {
        project
      },
      message: "project Created Successfully",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects =await  ProjectService.getProjects({});
    return res.status(200).json({
      success: true,
      data: {
        projects
      },
      message: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getSingleProject = async (req, res, next) => {
  try {
    const project = await ProjectService.getProject({_id:req.params.id});
    console.log(project)
    if(!project) return next({
      success: false,
      data: {},
      message: "Project Not found",
      status: 404,
    })
    return res.status(200).json({
      success: true,
      data: {
        project
      },
      message: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await ProjectService.updateProject({_id:req.params.id},req.body);
    if(!project) return next({
      success: false,
      data: {},
      message: "Project Not found",
      status: 404,
    })
    return res.status(200).json({
      success: true,
      data: {
        project
      },
      message: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

exports.delProject = async (req, res, next) => {
  try {
    const project = await ProjectService.updateProject({_id:req.params.id},{$set:{
      deletedAt:Date.now(),
      // deletedBy:
      isDeleted:true

    }})
    
    if(!project) return next({
      success: false,
      data: {},
      message: "Project Not found",
      status: 404,
    })
    
    return res.status(200).json({
      success: true,
      data: {
        project
      },
      message: "ok",
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};
