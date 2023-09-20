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
    db.Rug.find({})
        .then(rugs => 
         { console.log(rugs);
            res.render('rug-index', { rugs: rugs })})
})

// New Route (GET/Read): This route renders a form 
router.get('/new', (req, res) => {
    res.render('new-form')
})

// Create Route (POST/Create)
router.post('/', (req, res) => {
    db.Rug.create(req.body)
    .then(rug => res.redirect('/rugs/' + rug._id))
})

// Show route (GET/Read)
router.get('/:id', function (req, res) {
    db.Rug.findById(req.params.id)
        .then(rug => res.render('rug-details', { rug: rug }))
        .catch(() => res.send('404 Error: Page Not Found'))
})

// Edit Route (GET/Read): This route renders a form
router.get('/:id/edit', (req, res) => {
    db.Rug.findById(req.params.id)
        .then(rug => res.render('edit-form', { rug: rug }))
})

// Update Route (PUT/Update)
router.put('/:id', (req, res) => {
    const rugId = req.params.id;
    const decrementAmount = 1;
    db.Rug.updateOne(
        { _id: rugId },
        { $inc: { quantity: -decrementAmount } },
        { new: true }
    )
    .then(updatedRug => {
        res.redirect('/rugs/' + rugId);
    })
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
// we export all of our routes 
module.exports = router