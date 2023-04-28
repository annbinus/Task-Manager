const express = require('express');
const router = express.Router();

let Subject = require('../models/subject.model');

router.route('/').get((req, res) =>
{
    console.log('USER ID IN ROUTE: ' + req.query.userID); // console log the userID
    Subject.find({userID: req.query.userID})
        .then(subjects => {
            res.json(subjects);
        })
        .catch(err => res.status(400).json('Error: ' + err));
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

    console.log('SUBJECT NAME IN ADD: ' + name);
    console.log('SUBJECT BOARDID IN ADD: ' + boardID);
    console.log('SUBJECT USERID IN ADD: ' + userID);

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
    console.log('SUBJECTID IN DELETE: ' + req.params.id);
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