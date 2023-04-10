const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    start: {
        type: String,
        required: true,
    },
    completed: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;