let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let ContactList = require('../models/name');

module.exports.displayNameList = (req, res, next) => {
    ContactList.find().collation({locale:'en',strength: 2}).sort({name:1}).then((contactList) => {
            res.render('list/list',
            {title: 'ContactList',
            ContactList: contactList,
            displayName: req.user ? req.user.displayName : ''});
    }).catch((err) => {
        console.error(err);
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('/add', {title: 'Add Name', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = ContactList({
        "name": req.body.name,
        "contact": req.body.contact,
        "email": req.body.email
    });

    ContactList.create(newContact, (err, contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the name list
            res.redirect('/name-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    ContactList.findById(id, (err, name) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('/edit', {title: 'Edit Name', name: nameToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = ContactList({
        "_id": id,
        "name": req.body.name,
        "contact": req.body.contact,
        "email": req.body.email
    });

    ContactList.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the name list
            res.redirect('/name-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    ContactList.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the name list
             res.redirect('/name-list');
        }
    });
}