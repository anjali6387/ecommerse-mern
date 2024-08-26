const router = require("express").Router()

const Cart = require("../models/Cart")
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken")


//create cart
router.post("/:id", verifyTokenAndAuthorization, async(req,res)=>{
//     console.log("this is requested body")
// console.log(req.body)

   const cart = await Cart.findOne({userId:req.user.id})
       console.log(cart)
            if(cart){
                try{
                    const updatedCart = await Cart.findOneAndUpdate({userId:req.user.id},{
                        "$push":{
                           "products":req.body.products
                        }
                   },{new:true})
                   res.status(200).json(updatedCart)
                
                   console.log("hello updated cart")

                }catch(error){
                    res.status(400).json({error})
                }


            }
            else{

                const newCart =  new Cart( {
                    userId: req.user.id,
                    products : [req.body.products],
            })
                try{
                    console.log('cart created');
                    // console.log(newCart)
                 const savedCart = await newCart.save();
                  console.log('Cart saved successfully2!');
                //   console.log(savedCart)
                  res.status(201).json(savedCart);
                }catch(err){
                    res.status(500).json(err);
                }
               }
})


// remove cart items 
router.delete("/remove/:id/:productId",verifyTokenAndAuthorization,async(req,res)=>{
    
    try{
        
        // req.body = req.user.id
        // console.log("delete request")
        // console.log(req.body)    
        // console.log('Headers:', req.headers);

       const cart = await Cart.findOne({userId:req.user.id});
    //    console.log(cart)
       if(!cart){
        return res.status(400).json({msg:"cart not found"})
       }else{
        const updatedCart = await Cart.findOneAndUpdate({userId:req.user.id},
            {
                "$pull":{
                    "products":
                    {
                        "productId" : req.params.productId,
                        "color":req.body.color,
                        "size":req.body.size,
                    
                    },
                },
    
        },{new:true})
        console.log("updated DELETE cart")
        // res.status(200).json(req.body) 
        res.status(200).json(updatedCart)
    }

    }catch(err){
       res.status(400).json(err)
    }

})

 
 //get user cart by user
 router.get("/find/:userId",async(req,res)=>{
     try{
        console.log("making req")
        const cart =  await Cart.findOne({userId:req.params.userId})
        .populate("products.productId", "_id title price img")

       if(cart){
        // let cartItems={};
        let cartItems=[];
        cart.products.forEach((item,index)=>{
            // console.log(item.productId._id.toString())
            // console.log(item.color)
         cartItems[index]={
            _id:item.productId._id.toString(),
            img:item.productId.img,
            price:item.productId.price,
            quantity:item.quantity,
            color:item.color,
            size:item.size,
         }

        })
        // res.status(200).json(cart)
        // console.log(cartItems)
        res.status(200).json(cartItems)
       }
       else{
        res.status(400).json("no cart exist")
       }

     }catch(err){
         res.status(500).json(err);
     }
 })
 
//  //get all carts by admin
 
 router.get("/",verifyTokenAndAdmin, async(req,res)=>{
     
   try{

    const carts = await Cart.find()
    res.status(200).json(carts)

     }catch(err){
        //  res.status(500).json(err);
        console.log(err)
     }
 })
 
  



  



module.exports = router;