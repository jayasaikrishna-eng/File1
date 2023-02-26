const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Player = require('../models/player');

// => localhost:3000/players/
router.get('/', (req, res) => {
    Player.find((err, docs) => {
        if (!err) { 
            res.send(docs); 
        } else { 
            console.log('Error in retrieving players: ' + JSON.stringify(err, undefined, 2)); 
            res.status(500).send('Error in retrieving players'); 
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No player record with given id: ${req.params.id}`);
    }

    Player.findById(req.params.id, (err, doc) => {
        if (!err) { 
            res.send(doc); 
        } else { 
            console.log('Error in retrieving player: ' + JSON.stringify(err, undefined, 2)); 
            res.status(500).send('Error in retrieving player'); 
        }
    });
});

router.post('/', (req, res) => {
    const player = new Player({
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        team: req.body.team,
        goals: req.body.goals,
        assists: req.body.assists,
        yellowCards: req.body.yellowCards,
        redCards: req.body.redCards
    });

    player.save((err, doc) => {
        if (!err) { 
            res.send(doc); 
        } else { 
            console.log('Error in saving player: ' + JSON.stringify(err, undefined, 2)); 
            res.status(500).send('Error in saving player'); 
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No player record with given id: ${req.params.id}`);
    }

    const player = {
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        team: req.body.team,
        goals: req.body.goals,
        assists: req.body.assists,
        yellowCards: req.body.yellowCards,
        redCards: req.body.redCards
    };

    Player.findByIdAndUpdate(req.params.id, { $set: player }, { new: true }, (err, doc) => {
        if (!err) { 
            res.send(doc); 
        } else { 
            console.log('Error in updating player: ' + JSON.stringify(err, undefined, 2)); 
            res.status(500).send('Error in updating player'); 
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No player record with given id: ${req.params.id}`);
    }

    Player.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { 
            res.send(doc); 
        } else { 
            console.log('Error in deleting player: ' + JSON.stringify(err, undefined, 2)); 
            res.status(500).send('Error in deleting player'); 
        }
    });
});

