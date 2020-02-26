var router = require('express').Router()


router.use('/profile', require('./api/profile'));

router.use('/friend', require('./api/friend'));


module.exports = router