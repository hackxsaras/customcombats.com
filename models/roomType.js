const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roomTypeSchema = new Schema({
    map_name:{
        type: String,
        required: true
    },
    team_member_count:{
        type: Number,
        required: true
    },
    time_to_start:{
        type: Number,
        default: 3000
    }
});
module.exports = {
    roomTypeSchema
}