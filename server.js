/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
// we save all of our rug routes to the rugsCtrl variable
const rugsCtrl = require('./controllers/rugs')
const homeCtrl = require('./controllers/home')

/* Create the Express app
--------------------------------------------------------------- */
const app = express();

/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());
// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));


/* Mount routes
--------------------------------------------------------------- */
// About Route
app.get('/about', function (req, res) {
    res.render('about')
});

// Seed route: when a GET request is sent to `/seed`, the rugs collection is seeded
app.get('/seed', function (req, res) {
    db.Rug.deleteMany({})
        .then(removedRugs => {
            console.log(`Removed ${removedRugs.deletedCount} rugs`)
            // Seed the rugs collection with the seed data
            db.Rug.insertMany(db.seedRugs)
                .then(addedRugs => {
                    console.log(`Added ${addedRugs.length} rugs to our collection`)
                    res.json(addedRugs)
                })
        })
});

// Tell our app to look at the `controllers/rugs.js` file 
app.use('/rugs', rugsCtrl)
app.use('/', homeCtrl)

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
