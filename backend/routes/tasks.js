const router = require('express').Router();
const Subject = require('../models/subject.model');
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

router.route('/:id').get((req, res) =>
{
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) =>
{
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>
{
    Task.findById(req.params.id)
        .then(task =>
        {
            task.name = req.body.name;
            task.start = req.body.start;
            task.completed = req.body.completed;

            task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/move/:CardID/:ColumnID').put((req, res) => {
    //Sets task to new columnID
    Task.findById(req.params.CardID)
    .then(task => {
        var oldID = task.subjectID;

        task.subjectID = req.params.ColumnID;
        task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

    //Adds taskID to new column
    Subject.findById(req.params.ColumnID)
    .then(subject => {
        subject.tasks.push(req.params.CardID);
        subject.save()
            .then(() => res.json('Subject updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

    //FIXME: figure out how to remove from array
    //Removes task from old column
    /*Subject.findById(oldID)
    .then(subject => {

    })
    .catch(err => res.status(400).json('Error: ' + err));*/
});

module.exports = router;