const userController = require('../controllers/userController');
const newsController = require('../controllers/newsController')
const express = require('express');
const router = express.Router();

//user
router.post('/registration', userController.userRegistration);
router.post('/login', userController.userLogin);
router.post('/about', userController.about);

// update profile
router.post('/update-profile', userController.updateProfile);


// graduates list
router.get('/graduates-list', userController.graduatesList)

//news
router.post('/create-post', newsController.createNews)
router.get('/post', newsController.getNews)
router.post('/delete-post', newsController.deleteNews)
router.post('/my-post', newsController.myPost)

module.exports = router;





