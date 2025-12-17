const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)
// Login
router.post('/login',userController.loginController)
// google login
router.post('/google-login',userController.googleLoginController)
// home project
router.get('/home/books',bookController.getHomeBookController)

// -------------------------Authorised user------------------------
// -------------------------Role : User------------------------

// add book - request body in formdata,header should has token
router.post('/user/add/book',jwtMiddleware,multerMiddleware.array('uploadImg'),bookController.addBookController)

module.exports = router