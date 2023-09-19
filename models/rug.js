// This is the file where we define the schema for our pets collection.
// Anytime we build a schema, we put it in the file that matches the schema's name. 

// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the pets collection
const rugSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Persian', 'Turkish', 'Moroccan'], required: true },
    photo: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    dateAdded: { type: Date, default: Date.now }
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Rug', rugSchema);
