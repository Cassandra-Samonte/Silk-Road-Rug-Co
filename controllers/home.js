 /* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
// we need to access pet model in models folder so we require it here
const db = require('../models')

/* Routes
--------------------------------------------------------------- */

// Index Route (GET/Read): Will display all rugs
router.get('/', function (req, res) {
    db.Rug.find({ isFeatured: true })
        .then(rugs => { res.render('home', { rugs: rugs })
        })
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
// we export all of our routes 
module.exports = router

