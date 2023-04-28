const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) =>
{
    Task.find({ userID: req.session.userID })
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>
{
    const name = req.body.name;
    const start = req.body.start;
    const completed = req.body.completed;
    const deadline = req.body.deadline;
    const subjectID = req.body.subjectID;
    const description = req.body.description;
    const userID = req.body.userID

    const newTask = new Task({ name, start, completed, deadline, subjectID, description, userID });

    console.log("NEW TASK IN ADD: " + newTask);

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

router.route('/update/:id').put((req, res) =>
{
    Task.findById(req.params.id)
        .then(task =>
        {
            task.name = req.body.name;
            task.start = req.body.start;
            task.deadline = req.body.deadline;
            task.completed = req.body.completed;
            task.description = req.body.description;

            task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/move/:taskID/:subjectID').put((req, res) =>
{

    //Sets task to new subjectID
    Task.findById(req.params.cardID)
        .then(task =>
        {

            task.subjectID = req.params.subjectID;
            task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/bySubject/:subjectID').get((req, res) =>
{

    //Gets tasks by subjectID
    Task.find({ subjectID: req.params.subjectID })
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;