const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) =>
{
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>
{
    const name = req.body.name;
    const start = req.body.start;
    const completed = req.body.completed;

    const newTask = new Task({ name, start, completed });

    newTask.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;