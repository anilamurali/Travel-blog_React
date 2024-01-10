const multer=require('multer')
// store multer data
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})
// filter
const fileFilter=(req,file,callback)=>{
    if (file.mimetype === 'image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg') {
        
        callback(null,true)
    }
    else
    {
        return callback(new Error("invalied file Type.. must be png,jpg,jpeg"))
    }
}
const multerConfig=multer({
    storage,fileFilter
})
module.exports =multerConfig;
