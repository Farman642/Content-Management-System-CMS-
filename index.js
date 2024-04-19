const express = require ("express");
require("dotenv").config();
const connectDB= require("./confirg/Databaseconnect.js");



const app= express();

const port = process.env.PORT || 3000;

connectDB();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})