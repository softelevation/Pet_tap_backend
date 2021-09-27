var express = require('express');
var router = express.Router();


userController = require('../controllers/user.controller');

router.post('/registered',userController.registered);
router.post('/assign-tag',userController.assignTag);
router.get('/pet-tag/:id',userController.pettag);
router.get('/pets',userController.pettagAll);
router.get('/google_sheet',userController.google_sheet);


module.exports = router;
