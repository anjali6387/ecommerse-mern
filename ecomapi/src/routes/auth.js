const router = require("express").Router();
const User = require("../models/User")
const {encryptPassword,decryptPassword} = require("../helper/crypto")
const {generateAccessToken} = require("../helper/jwt")
const {verifyToken} = require("../middlewares/verifyToken.js")
// const {redisClient} = require('redis');
//register

let tokenBlacklist = new Set();

router.post("/register", async(req,res)=>{

    if(!req.body.username || !req.body.email || !req.body.password){
        res.status(400).json("missing credentials")
    }

    const duplicateUser = await User.findOne({username:req.body.username})
    console.log(duplicateUser);
    const duplicateMail = await User.findOne({email:req.body.email})
    
    if(duplicateUser ){
        res.status(409).json({msg: "this useranme or email is already taken"})
    }
    else if(duplicateMail){
        res.status(409).json({msg: "this email is already registered"})
    }
    else{
    
    const encryptedPassword = encryptPassword(req.body.password)
    const newUser = new User({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:encryptedPassword,
    });
try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)

}catch(err){
    res.status(500).json(err)
}
    }

})



// login 

router.post("/login",async(req,res)=>{
    try{
        const validUser = await User.findOne({username:req.body.username})
        if(!validUser){
            res.status(401).json({msg:"invalid Username"})
        }else{
        // console.log(validUser)
        const decryptedPassword = decryptPassword(validUser.password)
        // console.log(decryptedPassword);
        console.log(req.body.password)

        if(decryptedPassword !== req.body.password) {
            res.status(401).json("invalid password")
        }else{

        const accessToken = generateAccessToken(validUser)
        console.log("hereeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(accessToken)
        
        const {password, ...others} = validUser._doc; 

        res.status(200).json({...others,accessToken});
    }
}
    }catch(err){
       res.status(500).json(err)
    }
})


router.post('/logout/',verifyToken, (req, res) => {
    const token =  req.headers.token.split(' ')[1];
    console.log("toooookeeeeen " + token)
    if (token) {
        tokenBlacklist.add(token); // Add token to blacklist
        res.send('Logout successful');
    } else {
        res.status(401).send('No token provided');
    }
});
  


module.exports = router;