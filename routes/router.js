const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

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
// all book
router.get('/all-books',jwtMiddleware,bookController.getUserAllBookController)
// user book
router.get('/user-books',jwtMiddleware,bookController.getUserProfileBooksController)
// bought book
router.get('/user-books/bought',jwtMiddleware,bookController.getUserBoughtBooksController)
// edit user
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.userProfileUpdateController)
// view book
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)
// delete book
router.delete('/books/:id',jwtMiddleware,bookController.deleteBookController)
// book buy
router.put('/books/:id/buy',jwtMiddleware,bookController.bookPaymentController)


// -------------------------Role : Admin------------------------

// all admin books
router.get('/books/all',adminMiddleware,bookController.getAllBooksController)
// all user
router.get('/users/all',adminMiddleware,userController.allUserController)
// update book status
router.put('/books/:id/update',adminMiddleware,bookController.updateBookStatusController)



module.exports = router
