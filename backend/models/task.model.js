const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    start: {
        type: Date,
    },
    deadline: {
        type: Date,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    subjectID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;