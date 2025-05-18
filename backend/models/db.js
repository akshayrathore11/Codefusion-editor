require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DB;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

  

module.exports = mongoose;

