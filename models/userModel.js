// Define a Mongoose model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Usage example: Creating a new user
async function createUser() {
  try {
    const newUser = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 30
    });

    await newUser.save();
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Connecting to the database
const db = require('./database');

// Perform operations after successful connection
db.once('open', () => {
  console.log('MongoDB connection is open');
  
  // Call the function to create a user
  createUser();
});
