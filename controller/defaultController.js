const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');



module.exports = {
    index: async (req, res) => {
        try {
            const posts = await Post.find().lean();
            const categories = await Category.find().lean(); // Use Category model here
            res.render('default/index', { posts, categories });
        } catch (err) {
            console.error('Error fetching posts and categories:', err);
            res.status(500).send('Internal Server Error');
        }
    },

    login : ((req, res) => {
       res.render("default/login");
    }),
    loginPost : ((req, res) => {
        res.send("login success");
    }),
    registerGet : ((req, res) => {
        res.render("default/register");
    }),
    registerPost: async (req, res) => {
        const { firstName, lastName, email, password, passwordConfirm } = req.body;
        let errors = [];

        // Validate user input
        if (!firstName || !lastName || !email || !password || !passwordConfirm) {
            errors.push({ message: 'All fields are required' });
        }

        if (password !== passwordConfirm) {
            errors.push({ message: 'Passwords do not match' });
        }

        if (password.length < 6) {
            errors.push({ message: 'Password should be at least 6 characters long' });
        }

        if (errors.length > 0) {
            res.render('default/register', { errors, firstName, lastName, email });
        } else {
            try {
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                    errors.push({ message: 'Email is already registered' });
                    res.render('default/register', { errors, firstName, lastName, email });
                } else {
                    // Hash the password before saving
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);

                    // Create new user instance
                    const newUser = new User({
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword // Save hashed password
                    });

                    await newUser.save(); // Save the user to the database
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/login');
                }
            } catch (err) {
                console.error('Error registering user:', err);
                res.status(500).send('Internal Server Error');
            }
        }
    },
    singlePost: (req, res) => {
        const id = req.params.id;

        Post.findById(id).then(post => {
            if (!post) {
                res.status(404).json({message: 'No Post Found'});
            }
            else {
                res.render('default/singlePost', {post: post});
            }
        })
    }
};
