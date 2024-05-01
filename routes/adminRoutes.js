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

module.exports = router;


