let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Name List
let Name = require('../models/name');

// Get route for the Name list page
router.get('/', async (req, res, next) =>{
    try {
        let nameList = await Name.find();
        //console.log(nameList)

        res.render('name', {title: 'Name List', NameList: nameList})
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;