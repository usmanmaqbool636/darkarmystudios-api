const { ProjectsModel } = require("../models");

class ProjectService {
  newProject(request) {
    return new ProjectsModel(request);
  }

  getProject(req) {
    return ProjectsModel.findOne(req);
  }

  updateProject(req, data) {
    return ProjectsModel.findOneAndUpdate(req, data, { new: true });
  }

  getProjects(req) {
    return ProjectsModel.find(req);
  }

  getProjectsTitle(req) {
    return ProjectsModel.find(req).select("title");
  }
  
}

module.exports = new ProjectService();
