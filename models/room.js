const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomSchema = new Schema({
    type:{
        type: Schema.Types.ObjectId,
        ref: 'RoomType'
    },
    id:{
        type: Number,
        required: true,
        unique: true
    },
    pass: {
        type: String
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    startsAt: {
        type: Date,
        required: true
    }
});

module.exports = {
    bookSchema
}