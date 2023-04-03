const express = require('express');
const Position = require('../models/positionModel');
const mongoose = require('mongoose');
const router = express.Router();

//insert data
router.post("/",async (req,res)=>{
    const {company, position} = req.body;
    try{
        const data = await Position.create({company, position});
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

    const data = await Position.findByIdAndDelete(id)
    
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

    const data = await Position.findOneAndUpdate({_id:id},{
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
        const data = await Position.find({})
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

    const data = await Position.findById(id)
    
    if(!data){
        return res.status(404).json({error: "No data entry exists!"})
    }
    res.status(200).json(data)
})
module.exports = router;