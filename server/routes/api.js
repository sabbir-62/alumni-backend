const userController = require('../controllers/userController');
const newsController = require('../controllers/newsController')
const express = require('express');
const router = express.Router();

//user
router.post('/registration', userController.userRegistration);
router.post('/login', userController.userLogin);
router.post('/about', userController.about);


// graduates list
router.get('/graduates-list', userController.graduatesList)

//news
router.post('/create-news', newsController.createNews)
router.get('/news', newsController.getNews)

module.exports = router;