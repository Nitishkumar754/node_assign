var router = require('express').Router()
var auth = require('../../auth.service');
var friendCtrl = require('./friend.controller')

// router.get('/:id', profileCtrl.getProfile)
router.post('/makefriend', friendCtrl.make_friend);

router.post('/make/friend', friendCtrl.make_new_friend);
router.get('/listfriend', auth.isAuthenticated(), friendCtrl.list_friend);
router.post('/list/friend', friendCtrl.list_friend_by_email);
router.get('/mutualfriend', auth.isAuthenticated(), friendCtrl.get_mutual_friend);
router.post('/mutual/friend', friendCtrl.get_mutual_friend2);



module.exports = router

