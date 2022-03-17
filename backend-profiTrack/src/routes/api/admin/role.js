var router = require('express').Router();
const RoleController = require('../../../controllers/roles.js'); 
 
router.post("/",RoleController.addRole)
router.get("/",RoleController.getAllRoles)
router.get("/:id", RoleController.getSingleRole)
router.put("/update-role/", RoleController.updateRole)
router.delete("/", RoleController.deleteRole)

module.exports = router;
