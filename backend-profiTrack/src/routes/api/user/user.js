var router = require('express').Router();
var UserService = require('../../../services/user') 

router.post("/register",UserService.newUser)
router.get("/login", UserService.loginUser)

module.exports = router;
