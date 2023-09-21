/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (All Reviews): 
router.get('/', (req, res) => {
    db.Rug.find({}, { reviews: true, _id: false })
        .then(rugs => {
            const flatList = []
            for (let rug of rugs) {
                flatList.push(...rug.reviews)
            }
            res.render('reviews/review-index',
                { reviews: flatList }
            )
        })
});

// New Route: GET localhost:3000/reviews/new/:rugId
router.get('/new/:rugId', async (req, res) => {
    const rug = await db.Rug.findById(req.params.rugId)
    res.render('reviews/new-form', { rug: rug })
})

// Create Route: POST localhost:3000/reviews/
router.post('/create/:rugId', (req, res) => {
    db.Rug.findByIdAndUpdate(
        req.params.rugId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(rug => res.redirect('/reviews/'))
});

// Show Route: GET localhost:3000/reviews/:id
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Rug.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(rug => {
        //     console.log(rug)
        //     res.json(rug)
            res.render('reviews/review-details',
                { review: rug.reviews[0] }
            )
        })
        // db.Rug.findById(req.params.id)
        // .then(rug => {
        //     res.json(rug.reviews)
        // })
});

// Destroy Route: DELETE localhost:3000/reviews/:id
router.delete('/:id', (req, res) => {
    db.Rug.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(() => res.redirect('/reviews'))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router