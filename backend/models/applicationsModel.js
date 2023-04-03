const mongoose = require('mongoose');

const applicationsSchema = new mongoose.Schema({
    leaveType:{
        type: String,
        required: true
    },
    fromDate:{
        type: String,
        required: true
    },
    toDate:{
        type: String,
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("applications", applicationsSchema)