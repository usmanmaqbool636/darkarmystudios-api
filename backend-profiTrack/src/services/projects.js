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

  getProjectsAggregate(req) {
    // return ProjectsModel.find(req);
    return ProjectsModel.aggregate([
      {
        $match: req,
      },
      {
        $lookup: {
          from: "todos",
          localField: "_id",
          foreignField: "project",
          pipeline: [
            {
              $match: {
                isDeleted: false,
              },
            },
          ],
          as: "total_task",
        },
      },
      {
        $lookup: {
          from: "todos",
          localField: "_id",
          foreignField: "project",
          pipeline: [
            {
              $match: {
                isDeleted: false,
                isCompleted: true,
              },
            },
          ],
          as: "completed_task",
        },
      },
      {
        $addFields: {
          total_task: {
            $size: "$total_task",
          },
          completed_task: {
            $size: "$completed_task",
          },
        },
      },
    ]);
  }

  getProjectsTitle(req) {
    return ProjectsModel.find(req).select("title");
  }
}

module.exports = new ProjectService();
