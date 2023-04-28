const express = require('express');
const router = express.Router();

let Subject = require('../models/subject.model');

router.route('/').get((req, res) =>
{
    console.log('USER ID IN ROUTE: ' + req.cookies.userID); // console log the userID
    console.log('req.session:', req.session);
    Subject.find({userID: req.cookies.userID})
        .then(subjects => {
            console.log('SUBJECTS IN ROUTE: ' + subjects); // console log the subjects
            res.json(subjects);
        })
        .catch(err => res.status(400).json('Error: ' + err));

    console.log('USER ID IN ROUTE AFTER: ' + req.session.userID); // console log the userID
});

router.route('/byBoardID/:boardID').get((req, res) =>
{
    Subject.find({userID: req.session.userID, boardID: req.params.boardID})
        .then(subjects => res.json(subjects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>
{
    const name = req.body.name;
    const boardID = req.body.boardID;
    const userID = req.body.userID;

    const newSubject = new Subject({ name, boardID, userID});

    newSubject.save()
        .then(() => res.json('Subject added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/bySubjectID/:id').get((req, res) =>
{
    Subject.findById(req.params.id)
        .then(subject => res.json(subject))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) =>
{
    Subject.findByIdAndDelete(req.params.id)
        .then(() => res.json('Subject deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) =>
{
    Subject.findById(req.params.id)
        .then(subject =>
        {
            subject.name = req.body.name;

            subject.save()
                .then(() => res.json('Subject updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;