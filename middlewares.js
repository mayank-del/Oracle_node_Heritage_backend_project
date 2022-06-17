const authRole=(permissions)=>{
    return(req,res,next)=>{
        const userRole=req.body.role;
        if(permissions.includes(userRole)){
            next();
        }else{
            return res.status(401).json("you are not allowed to access records")
        }
    }
}

const authPassword=(grant)=>{
    return(req,res,next)=>{
        const userPassword=req.body.password;
        if(grant.includes(userPassword)){
            next();
        }else{
            return res.status(403).json("Password didn't match. Try re-entering it.")
        }
    }
}

/* const paramMiddleware=(req,res,next)=>{
    
} */

module.exports={authRole,authPassword};