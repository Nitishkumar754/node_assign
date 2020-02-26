var router = require('express').Router()

var profileCtrl = require('./profile.controller')

// router.get('/:id', profileCtrl.getProfile)
router.post('/create', profileCtrl.create_profile);
router.get('/list', profileCtrl.list_profile);



module.exports = router