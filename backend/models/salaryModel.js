const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    salary:{
        type: Number,
        required: true
    },
    bank:{
        type: String,
        required: true
    },
    account:{
        type: Number,
        required: true
    },
    holder:{
        type: String,
        required: true
    },
    ifsc:{
        type: String,
        required: true
    },
    tax:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("salary", salarySchema);