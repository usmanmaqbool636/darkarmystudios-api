const router = require('express').Router();
const ProjectController = require('../../controllers/projects'); 
const { addProjectValidation } = require('../../Validator/projects');
// Created But not tested
// Need Validator here
router.post("/add",addProjectValidation,ProjectController.addProject)
router.get("/all",ProjectController.getAllProjects)
router.put("/:id",ProjectController.updateProject)
router.delete("/:id", ProjectController.delProject)
router.get("/:id",ProjectController.getSingleProject)

module.exports = router;
