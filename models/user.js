const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    tokens: {
        type: Number,
        default: 0
    }
})

module.exports = {
    userSchema
}