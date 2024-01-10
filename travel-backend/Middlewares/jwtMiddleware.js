const jwt=require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
    console.log("inside the Router middleware");
    //tocken Verification
    // 1.get the token from reqHeader
    const tocken=req.headers['authorization'].slice(7)
    console.log(tocken);
   try{
        //2. verify tocken-verify()
    const tockenVarification=jwt.verify(tocken,"superkey2023")
    console.log(tockenVarification);
    req.payload=tockenVarification.userId
   
    
    next()


   }catch(err){
    res.status(401).json("Authorization failed... please login again")


   }

}
module.exports=jwtMiddleware