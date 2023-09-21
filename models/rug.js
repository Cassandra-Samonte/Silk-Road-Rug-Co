// Require the Mongoose package
const mongoose = require('mongoose');
const reviewSchema = require('./reviews.js')

// Create a schema to define the properties of the rugs collection
const rugSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    rating: Number,
    price: Number,
    quantity: Number,
    photo: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    dateAdded: { type: Date, default: Date.now },
    reviews: [reviewSchema]
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Rug', rugSchema);
