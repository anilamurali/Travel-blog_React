const express = require('express')

// create router object of express to define paths
const router = new express.Router()

// impot Usercontroller
const userController=require('../Controllers/userController')
// import blogController
const blogController=require('../Controllers/blogController')
// import review Controller
const reviewController=require('../Controllers/reviewController')

//import tourContoller
const tourContoller=require('../Controllers/tourController') 

// import jwtMiddleware
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
// import multerMiddleware
const multerConfig=require('../Middlewares/multerMiddleware')

// register Api call
router.post('/user/register',userController.register)
// login api call
router.post('/user/login',userController.login)
// user profile
router.get('/user/profile',jwtMiddleware,userController.profile)
// blogger profile
router.get('/user/blogger/:id',jwtMiddleware,userController.bloggerProfile)
// get all Profile
router.get('/user/all',jwtMiddleware,userController.getAllProfile)
// delete user
router.delete('/user/delete/:id',jwtMiddleware,userController.deleteUser)
// forgot Password
router.put('/user/resetpassword/:id',userController.forgotPassword)
// user profile using username
router.get('/user/forgotpassword/:id',userController.forgotPasswordProfile)




// add  blogs
router.post('/blog/add',jwtMiddleware,multerConfig.single('blogImage'),blogController.addBlog)
// get all blogs
router.get('/blog/allbolg',jwtMiddleware,blogController.allblogs)
//get home blogs
router.get('/blog/homebolg',blogController.homeBlogs)
// get userBlogs
router.get('/blog/userbolg',jwtMiddleware,blogController.userBlogs)
// get Blogers Profile
router.get('/blog/blogerblogs/:id',jwtMiddleware,blogController.bloggerBlog)

// get a Purticular user blog

router.get('/blog/particulablog/:id',jwtMiddleware,blogController.particularBlog)
// get a particular blog
router.get('/blog/singleblog/:id',jwtMiddleware,blogController.singleBlog)
// delete user Blogs
router.delete('/blog/deleteall/:id',jwtMiddleware,blogController.deleteUserBlog)

// delete user blog
router.delete('/blog/delete/:id',jwtMiddleware,blogController.deleteBlog)
// update user blog
router.put('/blog/update/:id',jwtMiddleware,multerConfig.single('blogImage'),blogController.updateBlog)
// update profile
router.put('/user/update',jwtMiddleware,multerConfig.single('profile'),userController.updateProfile)
// Add Review
router.post('/review/add',jwtMiddleware,reviewController.addReview)
// View Particular blogreview
router.get('/review/view/:id',jwtMiddleware,reviewController.getReview)
// delete review
router.delete('/review/delete/:id',jwtMiddleware,reviewController.deleteReview)
router.delete('/review/deleteall/:id',jwtMiddleware,reviewController.deleteUserReview)








module.exports = router