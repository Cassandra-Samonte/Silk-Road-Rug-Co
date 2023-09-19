// The code in this file will connect to the MongoDB Atlas Database
// Require the Mongoose package & your environment configuration
const mongoose = require('mongoose');
require('dotenv').config()

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

// Here we require the pet model and export it
module.exports = {
    Rug: require('./rug'),
    seedRugs: require('./seed')
}
