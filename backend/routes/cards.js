const router = require('express').Router();
let Card = require('../models/card.model');

//Get all cards
router.route('/').get((req,res) => {

    Card.find()
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get Card by CardID
router.route('/Get/byCardID/:id').get((req,res) => {
    const query = { CardID: req.params.id };

    Card.find(query)
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get Card by column
router.route('/Get/byColumnID/:id').get((req,res) => {
    const query = { ColumnID: req.params.id };

    Card.find(query)
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Add new Card
router.route('/add').post((req,res) => {

    const taskName = req.body.taskName;
    const description = req.body.description;
    const column = req.body.description;

    const newCard = new Card({taskName,description,column});

    newCard.save()
        .then(() => res.json('Card added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Update Card
router.route('/:id').put((req,res) => {

    const query = { CardID: req.params.id };

    const taskName = req.body.taskName;
    const description = req.body.description;
    const column = req.body.description;

    Card.findByIdAndUpdate(query, {taskName: taskName, description: description, column: column});
    Card.save()
        .then(() => res.json('Card updated!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//Delete Card
router.route('/{:id}').delete((req,res) => {
    const query = { CardID: req.params.id };

    Card.deleteOne(query);
    Card.save()
        .then(() => res.json('Card deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;