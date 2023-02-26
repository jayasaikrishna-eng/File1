const mongoose = require('mongoose');

var Employee = mongoose.model('players', {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    position: { type: String, required: true },
    team: { type: String, required: true },
    goals: { type: Number, required: true },
    assists: { type: Number, required: true },
    yellowCards: { type: Number, required: true },
    redCards: { type: Number, required: true }
});

module.exports =  Player ;

