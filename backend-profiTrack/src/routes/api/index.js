var router = require('express').Router();

router.use('/user', require('./user/user.js'));
// router.use('/posts', require('./posts.js'));

module.exports = router;