const mongoose = require('mongoose');

const Positions = mongoose.Schema({
    timeStamp: Date,
    personId: String
});

module.exports = mongoose.model('Positions', Positions);