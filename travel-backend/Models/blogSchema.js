const mongoose=require('mongoose')
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    blogImage:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },

    userId:{
        type:String,
        required:true
    },
  },
  {timestamps:true}
  );
const blogs=mongoose.model('blogs',blogSchema)
module.exports=blogs
