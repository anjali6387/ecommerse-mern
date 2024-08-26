const router = require("express").Router()
const User = require("../models/User")
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const {encryptPassword,decryptPassword} = require("../helper/crypto")


//update
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
   if(req.body.password){ 
    const encryptedPassword = encryptPassword(req.body.password)
    req.body.password = encryptedPassword;
}
try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },{new:true});

    res.status(200).json(updatedUser)

}catch(err){
    res.status(500).json(err);
}

})

//delete

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
         res.status(200).json("user has been deletd successfully")
    }catch(err){
        res.status(500).json(err);
    }
})

//get an user by admin
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
       const user =  await User.findById(req.params.id)
       const {password,...others} = user._doc
         res.status(200).json(others)
    }catch(err){
        res.status(500).json(err);
    }
})

//get latest 5 users if query param is true else all  by admin

router.get("/findall",verifyTokenAndAdmin, async(req,res)=>{
    
    const query = req.query.new;
    try{
       const users = query 
       ? await User.find().sort({_id:-1}).limit(2)  // shorting by is latest first
       : await User.find()
    //    console.log(users)
    //    const {password,...others} = users._doc
         res.status(200).json(users)
    }catch(err){
        //   console.log("bjhavdj")
        res.status(500).json(err);
    }
})

// get user  stats....users in perticular
router.get("/stats", verifyTokenAndAdmin,async(req,res)=>{
 const date = new Date(); // gonna return current adte 
 const lastYear = new Date(date.setFullYear(date.getFullYear()-1)) // gonna return last year today

 try{
    const data = await User.aggregate([
        {$match: {createdAt: {$gte:lastYear} } }, // if createdAt date is greater than last year
        {
            $project:{
                month:{$month: "$createdAt"},//gonna assign the user to the month in which it is created
            },
        },
        {
            $group:{
                _id:"$month",  // returning the month
                total:{$sum:1}, // returning the total users in that month
            },
        },
    ])
    res.status(200).json(data)
  
 }catch(err){
    res.status(500).json(err);
 }
})
  



module.exports = router;