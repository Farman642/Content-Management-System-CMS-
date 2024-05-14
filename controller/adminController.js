const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const {isEmpty} = require('../confirg/coustConfig');

module.exports = {
    index: (req, res) => {
        res.render("admin/index");
    },
    getPosts: (req, res) => {
        Post.find().lean().then(posts => {
            res.render("admin/posts/index", { posts: posts });
        })

        
    },
    // submitPosts: (req, res) => {

    //     const commentsAllowed = req.body.allowComments ? true : false;

    //     const { title, description, status,categories } = req.body;

    //     const newPost = new Post({
    //         title,
    //         description,
    //         status,
    //         commentsAllowed,
    //         categories
    //     });

    //     console.log(newPost)

    //     newPost.save()
    //         .then(post => {
    //             req.flash('success-message', 'Post created successfully.');
    //             res.redirect('/admin/posts');
    //         })
    //         .catch(err => {
    //             console.error('Error saving post:', err);
    //             req.flash('error-message', 'Failed to create post.');
    //             res.redirect('/admin/posts/create'); // Redirect to create page on error
    //         });
    // },

    submitPosts: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;

        let filename = '';
        // console.log(req.files);
        // console.log(typeof req.files);
        
       if(!isEmpty(req.files)) {
           let file = req.files.uploadedFile;
           filename = file.name;
           let uploadDir = './public/uploads/';
           
           file.mv(uploadDir+filename, (err) => {
               if (err)
                   throw err;
           });
       }
        const { title, description, status, categories,file } = req.body;
    
        const newPost = new Post({
            title,
            description,
            status,
            commentsAllowed,
            categories: categories, // Assuming categories is an array of category IDs
            file: `/uploads/${filename}`
        });
    
        newPost.save()
            .then(post => {
                req.flash('success-message', 'Post created successfully.');
                res.redirect('/admin/posts');
            })
            .catch(err => {
                console.error('Error saving post:', err);
                req.flash('error-message', 'Failed to create post.');
                res.redirect('/admin/posts/create');
            });
    },
    
    // createPostsGet: (req, res) => {

    //     Categories.find().lean().then(categories => {
    //         res.render("admin/posts/create", { categories: categories });
    //     })

    // },

    createPostsGet: (req, res) => {
        Category.find().lean().then(categories => {
            res.render("admin/posts/create", { categories: categories });
        }).catch(err => {
            console.error('Error fetching categories:', err);
            req.flash('error-message', 'Failed to fetch categories.');
            res.redirect('/admin/posts/create');
        });
    },
    
    editPost: (req, res) => {
        const { id } = req.params; // Use req.params.id directly
    
        Post.findById(id).lean().then(post => {

            Category.find().lean().then(categories => {
                res.render("admin/posts/edit", { post: post, categories: categories });
            })
            
            // if (!post) {
            //     req.flash('error-message', 'Post not found.');
            //     return res.redirect('/admin/posts');
            // }
    
            // res.render("admin/posts/edit", { post: post });
        }).catch(err => {
            console.error('Error finding post by ID:', err);
            req.flash('error-message', 'Failed to find post.');
            res.redirect('/admin/posts');
        });
    },

    editPostSubmit: (req, res) => {
        const allowComments = req.body.allowComments === 'on';

        const id = req.params.id;

        Post.findById(id)
            .then(post => {

                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComments = req.body.allowComments;
                post.description = req.body.description;
                post.category = req.body.category;


                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');

                });
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

        Category.find().lean().then(categories => {
            res.render("admin/categories/index", { categories: categories });
        })


        
    },

    createCategories: (req, res) => {
        var categoryName = req.body.name;

        if(categoryName) {
            const newCategory = new Category({
                title: categoryName
            });

            newCategory.save().then(Categories => {
               res.status(200).json(Categories); 
            });
        }


    },

    editCategoriesGetRoute: async (req, res) => {
        const categoriesID = req.params.id;

        const categoriess = await Category.find();


        Category.findById(categoriesID).then(cat => {

            res.render('admin/categories/edit', {category: cat, categories: categoriess});

        });
    },


    editCategoriesPostRoute: (req, res) => {
        const categoriesID = req.params.id;
        const newTitle = req.body.name;

        if (newTitle) {
            Category.findById(categoriesID).then(category => {

                Category.title = newTitle;

                Category.save().then(updated => {
                    res.status(200).json({url: '/admin/categories'});
                });

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
