const express = require('express');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const router = express.Router();

//insert data
router.post("/",async (req,res)=>{
    const {firstname,middlename,lastname,gender,contact,dob,hobbies,address} = req.body;
    try{
        const data = await User.create({firstname,middlename,lastname,gender,contact,dob,hobbies,address});
        res.status(200).json(data);
    }catch(error){
        res.status(400).json({error: error.message});
    }
});


//delete data
router.delete("/:id",async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No data entry exists!"})
    }

    const data = await User.findByIdAndDelete(id)
    
    if(!data){
        return res.status(404).json({error: "No data entry exists!"})
    }
    res.status(200).json(data)
});

//update data
router.patch("/:id",async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No data entry exists!"})
    }

    const data = await User.findOneAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!data){
        return res.status(404).json({error: "No data entry exists!"})
    }
    res.status(200).json(data)
});

//view data
router.get("/",async (req,res)=>{
    try{
        const data = await User.find({})
        res.status(200).json(data)
    }catch(error){
        res.status(400).json({error: error.message})
    }
});

//view particular data entry
router.get("/:id",async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No data entry exists!"})
    }

    const data = await User.findById(id)
    
    if(!data){
        return res.status(404).json({error: "No data entry exists!"})
    }
    res.status(200).json(data)
})
module.exports = router;