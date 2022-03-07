var router = require('express').Router();

router.use('/user', require('./user/user.js'));
router.use('/posts', require('./user/projects.js'));

module.exports = router;