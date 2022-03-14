const router = require('express').Router();
const ProjectController = require('../../controllers/projects'); 
const { addProjectValidation } = require('../../Validator');

// TODO we need to add middleware so that we can handle permissions
router.post("/add",addProjectValidation,ProjectController.addProject)
router.get("/all",ProjectController.getAllProjects)
router.put("/:id",ProjectController.updateProject)
router.patch("/setImportant/:id",ProjectController.setProjectImportant)
router.delete("/:id", ProjectController.delProject)
router.get("/:id",ProjectController.getSingleProject)

module.exports = router;

// [{ role: 'readWrite', db: 'config' },
// { role: 'clusterAdmin', db: 'admin' },
// { role: 'readWrite', db: 'profitrack' }]

// db.updateUser( "usman_maqbool",
//                {

//                  roles : [
//                     { role: 'readWrite', db: 'config' },
//                     { role: 'clusterAdmin', db: 'admin' },
//                     { role: 'readWrite', db: 'profitrack' }
//                          ]
//                 }
//              )
