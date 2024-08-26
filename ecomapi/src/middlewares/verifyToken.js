const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        console.log("token is: " + token);
        jwt.verify(token, process.env.ACCESS_SEC, (err,user)=>{
            if(err) {res.status(403).json({msg:"token is not valid!"})
                console.log(err)
            }
                else{
          
            req.user = user;
        console.log(user)
        next(); 
             }  
        })
        
    }else{
        return res.status(401).json({msg:"you are not authenticated!"})
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        console.log(req.params.id)
        console.log(req.user.id)
        if(req.user.id === req.params.id || req.user.isAdmin){
           next()
        }else{
            res.status(403).json("you are not allowed to make any changes")
        }
        
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            // console.log("hello")
           next()
        }else{
            res.status(403).json("Only admin have the access to do this")
        }
        
    })
}

module.exports = {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}