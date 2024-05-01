const Post = require('../models/postModel');
const Categories = require('../models/categoryModel');

module.exports = {
    index: (req, res) => {
        res.render("admin/index");
    },
    getPosts: (req, res) => {
        Post.find().lean().then(posts => {
            res.render("admin/posts/index", { posts: posts });
        })



        
    },
    submitPosts: (req, res) => {

        const commentsAllowed = req.body.allowComments ? true : false;

        const { title, description, status,categories } = req.body;

        const newPost = new Post({
            title,
            description,
            status,
            commentsAllowed,
            categories
        });

        console.log(newPost)

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

        Categories.find().lean().then(categories => {
            res.render("admin/posts/create", { categories: categories });
        })

    },

    editPost: (req, res) => {
        const { id } = req.params; // Use req.params.id directly
    
        Post.findById(id).lean().then(post => {
            if (!post) {
                req.flash('error-message', 'Post not found.');
                return res.redirect('/admin/posts');
            }
    
            res.render("admin/posts/edit", { post: post });
        }).catch(err => {
            console.error('Error finding post by ID:', err);
            req.flash('error-message', 'Failed to find post.');
            res.redirect('/admin/posts');
        });
    },

    deletePost: (req, res) => {
        const { id } = req.params;
    
        Post.findByIdAndDelete(id)
            .then(() => {
                req.flash('success-message', 'Post deleted successfully.');
                res.redirect('/admin/posts');
            })
            .catch(err => {
                console.error('Error deleting post:', err);
                req.flash('error-message', 'Failed to delete post.');
                res.redirect('/admin/posts');
            });
    },

    getCategories: (req, res) => {

        Categories.find().lean().then(categories => {
            res.render("admin/categories/index", { categories: categories });
        })


        
    },

    createCategories: (req, res) => {
        var categoryName = req.body.name;

        if(categoryName) {
            const newCategory = new Categories({
                title: categoryName
            });

            newCategory.save().then(category => {
               res.status(200).json(category); 
            });
        }


    },

    deleteCategory: (req, res) => {
        const { id } = req.params;
    
        Category.findByIdAndDelete(id)
            .then(() => {
                req.flash('success-message', 'Category deleted successfully.');
                res.redirect('/admin/categories');
            })
            .catch(err => {
                console.error('Error deleting category:', err);
                req.flash('error-message', 'Failed to delete category.');
                res.redirect('/admin/categories');
            });
    },
    
    
};
