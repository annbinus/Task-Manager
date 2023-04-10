const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    TaskName:{
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    Description:{
        type: String,
        trim:true
    },
    Column:{
        type: String,
        required: true,
        trim:true
    },
    CardID:{
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;