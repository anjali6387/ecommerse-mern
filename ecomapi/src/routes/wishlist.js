const router = require("express").Router()

const Wishlist = require("../models/Wishlist")
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken")


//wishlist 
router.post("/", verifyToken, async(req,res)=>{
// console.log(req.body)
// console.log("this is requested body")
   const wishlist = await Wishlist.findOne({userId:req.user.id})
            if(wishlist){
            const Item = wishlist.products.find(item => item.productId == req.body.products.productId)
                if(!Item){            
                    try{
                        const updatedWishlist = await Wishlist.findOneAndUpdate({userId:req.user.id},{
                            "$push":{
                               "products":req.body.products
                            }
                       },{new:true})
                       res.status(200).json(updatedWishlist)
                    
                       console.log("hello updated wishlist")
    
                    }catch(error){
                        res.status(400).json({error})
                    }

                }

            }
            else{

                const newWishlist =  new Wishlist( {
                    userId: req.user.id,
                    products : [req.body.products],
            })
                try{
                    console.log('wishlist created');
                 const savedWishlist = await newWishlist.save();
                  console.log('wishlist saved successfully2!');
                  console.log(savedWishlist)
                  res.status(201).json(savedWishlist);
                }catch(err){
                    res.status(500).json(err);
                }
    
            }
})


// remove wishlist items 
router.delete("/remove/:id/:productId",verifyTokenAndAuthorization,async(req,res)=>{
    
    try{
        console.log("delete wish request")
       const wishlist = await Wishlist.findOne({userId:req.user.id})
       if(!wishlist){
        return res.status(400).json({msg:"wishlist not found"})
       }else{
        // console.log(req.params.productId)
        // const updatedWishlist = await Wishlist.findOneAndUpdate({userId:req.user.id},
        //     {
        //         "$pull":{
        //             "products":
        //             {
        //                 "productId" : req.params.productId,
        //             },
        //         },
    
        // },{new:true})
        // console.log("updated DELETE cart")
        // res.status(200).json(updatedWishlist)
        // console.log(wishlist.products)
        // wishlist.products = wishlist.products.filter((fav) => !fav.equals(req.params.productId));
        
        // await wishlist.save();
        // console.log(wishlist.products)
        // return res
        //   .status(200)
        //   .json({ message: "Product removed from favorites successfully", user });
        const productIndex = wishlist.products.findIndex((item) =>
            item.productId.equals(req.params.productId))
        wishlist.products.splice(productIndex, 1);

        await wishlist.save()

        res.status(200).json(wishlist.products)


            }

    }catch(err){
       res.status(400).json(err)
    }

})


 //find wishlist
 router.get("/find/:userId",async(req,res)=>{
     try{
        // console.log("making req")
        const wishlist =  await Wishlist.findOne({userId:req.params.userId})
        .populate("products.productId", "_id title desc price oldprice img")

       if(wishlist){
        let wishlistItems=[];
        wishlist.products.forEach((item,index)=>{
            // console.log(item.productId._id.toString())
         wishlistItems[index]={
            _id:item.productId._id.toString(),
            title:item.productId.title,
            desc:item.productId.desc,
            img:item.productId.img,
            price:item.productId.price,
            oldprice:item.productId.oldprice
              }
         })
        res.status(200).json(wishlistItems)
       }
     }catch(err){
         res.status(500).json(err);
     }
 })
 
 
  



  



module.exports = router;