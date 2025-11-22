 const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorised = token ==="xyz";
    if(!isAdminAuthorised){
        res.status.send("Admin is not authorised")
    }else{
        next();
    }
   };
   module.exports = {
    adminAuth,
   }