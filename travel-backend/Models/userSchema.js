const mongoose = require('mongoose')
const validator = require('validator')
// // import jwt
// const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: [3,]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalied email')
            }
        }
    },
    place:{
        type: String,
        required: true,
    },
    joined:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile:{
        type: String,
    },
    overview:{
        type: String,
    },
    role:{
        type:String,
        default:"user"
    }


})

const users = mongoose.model('users', userSchema)
module.exports = users