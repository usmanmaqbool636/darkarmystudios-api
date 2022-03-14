var router = require('express').Router();
const AdminController = require('../../../controllers/admins.js'); 
 
router.post("/signup",AdminController.addAdmin)
router.get("/signin", AdminController.getSingleAdmin)
router.get("/all",AdminController.getAllAdmins)
router.put("/:id", AdminController.updateAdmin)
router.delete("/:id", AdminController.deleteAdmin)
router.get("/:id",AdminController.getSingleAdmin)

module.exports = router;
