const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const columnSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;