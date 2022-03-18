const ProjectsModel = require("./project");
const Todos = require("./todo");
const RolesModel = require("./role");
const AdminsModel = require("./admin");
module.exports = {
    ProjectsModel,
    TodosModel:Todos,
    AdminsModel,
    RolesModel,
} 