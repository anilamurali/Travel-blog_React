const mongoose=require('mongoose')
const reviewSchema = new mongoose.Schema(
    {
      blogId: {
        type:String,
       required:true
      },
      userId:{
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      reviewText: {
        type: String,
        required: true,
      },
      time:{
        type:String,
        required:true,
      }
    },
    { timestamps: true }
  );

  const reviews=mongoose.model('reviews',reviewSchema)
  module.exports=reviews;