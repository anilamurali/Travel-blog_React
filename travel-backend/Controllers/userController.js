const users = require('../Models/userSchema')
// import jwt

const jwt=require('jsonwebtoken')

// Register
exports.register = async (req, res) => {
    console.log('inside Register');
//  res.status(200).json("Regiter request received")
const {username,email,place,joined,password}=req.body
console.log(username,email,place,joined,password);
try{
    const existingUser= await users.findOne({email})
    if (existingUser) {
        res.status(406).json("User already registered") 
    }
    else{
        const newUser= new users({
            username,
            email,
            place,
            joined,
            password,
            profile:"",
            overview:"", 
            
        })
        await newUser.save() //data saved in moongoDB
        res.status(200).json(newUser)
    }
}
catch(err){
    res.status(500).json("Register API Failed")
}

}


// login
exports.login=async(req,res)=>{
    // res.status(200).json("login request reviwed")
    console.log("Inside the Login function");
    const {email,password}=req.body
    console.log(email,password);
    try{
        const existingUser=await users.findOne({email,password})
        if (existingUser) {
            // token generation
            const token=jwt.sign({userId:existingUser._id,username:existingUser.username},"superkey2023")
            res.status(200).json({existingUser,token})
            
        }
        else{
            res.status(401).json("invalied credntials ")

        }
    }
    catch(err){
        res.status(500).json("Login API Failed")


    }

}
// get user profile
exports.profile=async(req,res)=>{
    const id=req.payload
    try{
        const yourProfile= await users.findOne({_id:id})
        res.status(200).json(yourProfile)
    }
    catch(err){
        res.status(401).json({"Request failed ": +err})
    }

}

// get blogger profile
exports.bloggerProfile=async(req,res)=>{
    const {id}=req.params
    try{
        const yourProfile= await users.findOne({_id:id})
        res.status(200).json(yourProfile)
    }
    catch(err){
        res.status(401).json({"Request failed ": +err})
    }

}



// get all profile
exports.getAllProfile=async(req,res)=>{
    try{
        const allProfiles=await users.find()
        res.status(200).json(allProfiles)
    }
    catch(err){
        res.status(401).json({"Request Failed": +err})
    }
}
// update profile
exports.updateProfile = async (req, res) => {
    const userId = req.payload
    // get value from request
    // const { id } = req.params
    const { username,place,profile,overview, } = req.body
    const file = req.file ? req.file.filename : profile
    // console.log(req.body);
    console.log(username,profile,place, overview);


    try {
        const updateProfile = await users.findByIdAndUpdate({ _id:userId },
            { username,place,profile: file,overview })

        await updateProfile.save()
        res.status(200).json(updateProfile)
    }
    catch (err) {
        res.status(401).json({ "Request failded": +err })

    }
}

// delete profile

exports.deleteUser= async (req, res) => {
    const {id} = req.params
    try {
        const deleteBlog = await users.deleteOne({_id:id })
        res.status(200).json(deleteBlog)
    } catch (err) {
        res.status(401).json({ "Request failded": +err })
    }
}

// forgott password
exports.forgotPassword=async (req,res)=>{
    const {id}=req.params
    const {password}=req.body
    console.log(password);
    try{
        const resetPassword=await users.findOneAndUpdate({email:id},{password})
        await resetPassword.save()
        res.status(200).json(resetPassword)
    }
    catch(err){
        res.status(401).json({ "Request failded": +err })
    }
}
// fetch user profile using username
exports.forgotPasswordProfile=async(req,res)=>{
    const {id}=req.params
    try{
        const yourProfile= await users.findOne({email:id})
        res.status(200).json(yourProfile)
    }
    catch(err){
        res.status(401).json({"Request failed ": +err})
    }

}