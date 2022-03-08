var router = require('express').Router();
var AdminService = require('../../../services/admin') 

router.post("/signup",AdminService.newAdmin)
router.get("/", AdminService.getAdmin)

module.exports = router;
