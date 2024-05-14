const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");




router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next()
})

router.route('/').get(adminController.index);

router.route('/posts').get(adminController.getPosts);
    
router.route('/posts/create').get(adminController.createPostsGet).post(adminController.submitPosts);

router.route('/posts/edit/:id').get(adminController.editPost).put(adminController.editPostSubmit);

router.delete('/posts/delete/:id', adminController.deletePost);

router.route('/categories').get(adminController.getCategories).post(adminController.createCategories);

router.route('/category/edit/:id').get(adminController.editCategoriesGetRoute).post(adminController.editCategoriesPostRoute);

router.delete('/categories/:id', adminController.deleteCategory);


module.exports = router;


