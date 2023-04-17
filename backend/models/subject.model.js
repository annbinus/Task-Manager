const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    boardID:{
        type: String,
        required: true,
    },
    userID:{
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;