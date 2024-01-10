// import blog controller
const blogs = require('../Models/blogSchema')

exports.addBlog = async (req, res) => {
    console.log("inside addBlog");
    // res.status(200).json("Add Project request received")
    const userId = req.payload
    console.log(userId);
    // get Image
    const blogImage = req.file.filename;
    // get Blog details
    const { title, location, content,time ,username} = req.body;
    console.log(title, location, content, blogImage,time,username, userId);
    try {
        const existingUser = await blogs.findOne({ title })
        if (existingUser) {
            res.status(406).json("Blog Already exists")

        }
        else {
            // ther is no other  title like this
            const newBlog = new blogs({ title, location, content, blogImage,time,username, userId })
            // send response to the client
            await newBlog.save()
            res.status(200).json(newBlog)

        }

    } catch (err) {
        res.status(401).json({ "Request failded": +err })


    }



}
// get all blogs

exports.allblogs = async (req, res) => {
    const searchkey=req.query.search
    const query={
        location: {
            $regex: searchkey,
            $options: "i" // avoid case sencitivity
        }
    }
    try {
        const allBlogs = await blogs.find(query)
        res.status(200).json(allBlogs)

    }
    catch (err) {
        res.status(401).json({ "Request failded": +err })

    }

}
// home Blogs
exports.homeBlogs=async(req,res)=>{
    try{
        const homeBlog=await blogs.find().limit(4)
        res.status(200).json(homeBlog)

    }
    catch(err){
        res.status(401).json({ "Request failded": +err })
    }

}

// get userBlogs
exports.userBlogs=async(req,res)=>{
    const userId=req.payload
    try{
        const userBlogs=await blogs.find({userId})
        res.status(200).json(userBlogs)
    }
    catch(err){
        res.status(401).json({ "Request failded": +err })
        

    }
}
// blogger's blog
exports.bloggerBlog=async(req,res)=>{
    const {id}=req.params
    try{
        const userBlogs=await blogs.find({userId:id})
        res.status(200).json(userBlogs)
    }
    catch(err){
        res.status(401).json({ "Request failded": +err })
        

    }
}
// View Single user blog
exports.particularBlog=async(req,res)=>{
    const userId = req.payload
    const {id}=req.params
    try{
        const singleBlog = await blogs.findOne({userId,_id:id})
        res.status(200).json(singleBlog)

    }
    catch(err){
        res.status(401).json({ "Request failded": +err })

    }
}
// View Single  blog
exports.singleBlog=async(req,res)=>{
    
    const {id}=req.params
    try{
        const singleBlog = await blogs.findOne({_id:id})
        res.status(200).json(singleBlog)

    }
    catch(err){
        res.status(401).json({ "Request failded": +err })

    }
}

// delete user blogs
exports.deleteBlog= async (req, res) => {
    const userId = req.payload
    const { id } = req.params
    try {
        const deleteBlog = await blogs.deleteOne({ userId, _id: id })
        res.status(200).json(deleteBlog)
    } catch (err) {
        res.status(401).json({ "Request failded": +err })
    }
}

// delete user bloges
exports.deleteUserBlog= async (req, res) => {
    const { id } = req.params
    try {
        const deleteBlog = await blogs.deleteMany({ userId:id })
        res.status(200).json(deleteBlog)
    } catch (err) {
        res.status(401).json({ "Request failded": +err })
    }
}
// Upadate user blog

exports.updateBlog = async (req, res) => {
    const userId = req.payload
    // get value from request
    const { id } = req.params
    const { title, location, content, blogImage,time } = req.body
    const file = req.file ? req.file.filename : blogImage
    console.log(req.body);
    console.log(title, location, content, blogImage,time);


    try {
        const updateBlog = await blogs.findByIdAndUpdate({ userId, _id: id },
            { title, location, content, blogImage: file,time })

        await updateBlog.save()
        res.status(200).json(updateBlog)
    }
    catch (err) {
        res.status(401).json({ "Request failded": +err })

    }
    // res.status(200).json("Add blog request received")
    // console.log("inside add blog");



}

