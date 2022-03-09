var router = require('express').Router();

router.use('/admin', require('./admin/admin.js'));
router.use('/projects', require('./projects'));

module.exports = router;