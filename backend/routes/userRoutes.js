var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var userController = require('../controllers/userController.js');
var photoController = require('../controllers/photoController.js');

router.get('/', userController.list);
//router.get('/register', userController.showRegister);
//router.get('/login', userController.showLogin);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);
router.get('/:id', userController.show);

router.post('/', userController.create);
router.post('/login', userController.login);
router.post('/uploadPhoto', upload.single('image'), photoController.create, userController.update);

router.put('/:id', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;
