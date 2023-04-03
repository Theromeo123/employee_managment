require('dotenv').config();
const express = require('express');
const applicationsRoutes = require('./routes/applicationsController');
const positionRoutes = require('./routes/positionController');
const salaryRoutes = require('./routes/salaryController');
const userRoutes = require('./routes/userController');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//middlewares
app.use((req,res,next) =>{
    console.log(req.path,req.method);
    next();
});

//routes
app.use('/api/hr/applications/', applicationsRoutes);
app.use('/api/hr/position/', positionRoutes);
app.use('/api/hr/salary/', salaryRoutes);
app.use('/api/hr/user/', userRoutes);

mongoose.set("strictQuery", false);
const DB_URL= process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

mongoose.connect(DB_URL)
.then(() => {
    app.listen(process.env.PORT, () =>{
        console.log('conected to db and listening on port',process.env.PORT);
    });
})
.catch((error) => {
    console.log(error);
})

