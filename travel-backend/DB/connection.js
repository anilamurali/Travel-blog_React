// import mongoose

const mongoose=require('mongoose')

const connectionString= process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connection Established");
}).catch((err)=>{
    console.log("MOngoDb Connection Error" +err);

})