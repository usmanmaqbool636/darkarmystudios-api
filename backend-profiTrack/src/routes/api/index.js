var router = require('express').Router();

router.use('/user', require('./user/user.js'));
router.use('/admin', require('./admin/admin.js'));

module.exports = router;