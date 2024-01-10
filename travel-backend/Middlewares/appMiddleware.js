const appMiddleware=(req,res,next)=>{
    console.log("inside the application level middleware");
    next();
}
module.exports=appMiddleware;