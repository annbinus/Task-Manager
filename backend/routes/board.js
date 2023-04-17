const router = require('express').Router();
let Board = require('../models/board.model');

router.route('/').get((req, res) =>
{
    Board.find({userID: req.session.userID})
        .then(boards => res.json(boards))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>
{
    const name = req.body.name;
    const userID = req.session.userID;

    const newSubject = new Board({ name, userID });

    newSubject.save()
        .then(() => res.json('Board added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>
{
    Board.findById(req.params.id)
        .then(board => res.json(board))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) =>
{
    Board.findByIdAndDelete(req.params.id)
        .then(() => res.json('Board deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) =>
{
    Board.findById(req.params.id)
        .then(board =>
        {
            board.name = req.body.name;

            board.save()
                .then(() => res.json('Board updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;