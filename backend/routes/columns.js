const router = require('express').Router();
const { Collection } = require('mongoose');
let User = require('../models/column.model');
const Column = require('../models/column.model');

router.route('/').get((req, res) =>
{
    User.find()
        .then(columns => res.json(columns))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>
{
    const username = req.body.username;
    const description = req.body.description;

    const newColumn = new Column({ username, description });

    newUser.save()
        .then(() => res.json('Column added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;