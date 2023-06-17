let mongoose = require ('mongoose');

// create a model class
let nameModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String
},
{
    collection: 'name'
});

module.exports = mongoose.model('Name', nameModel);