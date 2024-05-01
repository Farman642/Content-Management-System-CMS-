const Post = require('../models/postModel');

module.exports = {
    index: (req, res) => {
        res.render("admin/index");
    },
    getPosts: (req, res) => {
        res.send("get posts");
    },
    submitPosts: (req, res) => {
        const { title, description, status } = req.body;

        const newPost = new Post({
            title,
            description,
            status
        });

        newPost.save()
            .then(post => {
                req.flash('success-message', 'Post created successfully.');
                res.redirect('/admin/posts');
            })
            .catch(err => {
                console.error('Error saving post:', err);
                req.flash('error-message', 'Failed to create post.');
                res.redirect('/admin/posts/create'); // Redirect to create page on error
            });
    },
    createPostsGet: (req, res) => {
        res.render("admin/posts/create");
    }
};
