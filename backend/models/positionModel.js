const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    }  
})

module.exports = mongoose.model("position", positionSchema)