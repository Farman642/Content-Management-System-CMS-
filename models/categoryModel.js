const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', CategorySchema); // Use Category as model name
module.exports = Category; // Export the Category model
