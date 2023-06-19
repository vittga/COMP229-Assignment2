let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let gameController = require('../controllers/name')

function requireAuth(req, res, next)
{
    //check is the user loged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//connect to our Name List
let Name = require('../models/name');

// Get route for the Name list page = READ Operation
router.get('/', async (req, res, next) =>{
    try {
        let nameList = await Name.find();
        console.log('namelist = ', nameList);
       // nameList = NameList;

        //res.render('name', {title: 'Name List', NameList: nameList})
       
        res.render('name', {title: 'Name List', NameList: nameList, displayName: req.user ? req.user.displayName : ''});
       
    } catch (err) {
        console.error(err);
    }
});

// Get Route for displaying the Add page -  CREATE Operation
router.get('/add', requireAuth, async (req, res, next) =>{
    try {
        res.render('add', {title: 'Add Name', displayName: req.user ? req.user.displayName : ''});
       
    } catch (err) {
        console.error(err);
    }
});


// Post Route for processing the Add Page - CREATE Operation

router.post('/add', requireAuth, async (req, res, next) =>{
    let newName = new Name ({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    })

    try{
        await newName.save();
        res.redirect('/name-list');
    }
    catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});
 
// Get Router for displaying the Edit Page - UPDATE Operation
router.get('/edit/:id', requireAuth, async (req, res, next) =>{
    let id = req.params.id;

    try {
        let nameToEdit = await Name.findById(id);

        res.render('edit', {title: 'Edit Name', name: nameToEdit, displayName: req.user ? req.user.displayName : ''});
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Post Route for processing the Edit Page - UPDATE Operation
router.post('/edit/:id', requireAuth, async (req, res, next) =>{
    let id = req.params.id;
    let updatedName = {
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    };

    try {
        await Name.updateOne({_id: id}, updatedName);
        res.redirect('/name-list');
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get to perform Deletion - DELETE Operation
router.get('/delete/:id', requireAuth, async (req, res, next) =>{
    let id = req.params.id;

    try {
        await Name.findByIdAndRemove(id);
        res.redirect('/name-list');
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});





module.exports = router;