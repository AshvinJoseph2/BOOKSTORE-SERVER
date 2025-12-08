const mongoose = require('mongoose')

const connectionString = process.env.databaseurl

mongoose.connect(connectionString).then(res=>{
    console.log("MonogoDB Atlas Database connected Successfully!!!");
}).catch(error=>{
    console.log("Database connection failed!!!");
    console.log(error);
})