const router = require('express').Router();
let Subject = require('../models/subject.model');

router.route('/').get((req, res) =>
{
    Subject.find()
        .then(subjects => res.json(subjects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>
{
    const name = req.body.name;

    const newSubject = new Subject({ name });

    newSubject.save()
        .then(() => res.json('Subject added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;