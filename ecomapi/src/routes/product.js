const router = require("express").Router()

const Product = require("../models/Product")
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken")


//create product
router.post("/", verifyTokenAndAdmin, async(req,res)=>{
    const newProduct =  new Product(req.body);
    // console.log(newProduct)

    try{
        console.log('User saved successfully!');
     const savedProduct = await newProduct.save();
    //   console.log('product saved successfully2!');
    //   console.log(savedProduct);
      res.status(201).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//update

router.put("/:id", verifyTokenAndAdmin , async(req,res)=>{
 try{
     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
         $set:req.body
     },{new:true});
 
     res.status(200).json(updatedProduct)
 
 }catch(err){
     res.status(500).json(err);
 }
 
 })
 
 //delete
 
 router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
     try{
         await Product.findByIdAndDelete(req.params.id)
          res.status(200).json("product has been deletd successfully")
     }catch(err){
         res.status(500).json(err);
     }
 })
 
 //get an product
 router.get("/find/:id",async(req,res)=>{
     try{
        const product =  await Product.findById(req.params.id)
          res.status(200).json(product)
     }catch(err){
         res.status(500).json(err);
     }
 })
 
 //get all products 
 
 router.get("/", async(req,res)=>{
     
     const queryNew = req.query.new;
     const queryCategory = req.query.category;
     try{
        let products;

        if(queryNew){
            products = await Product.find().sort({createdAt:-1}).limit(3)
        }else if(queryCategory){
            products = await Product.find({
                categories:{
                    $in:[queryCategory],
            },
        })
        }else{
            products = await Product.find();
        }
          res.status(200).json(products)
     }catch(err){
         //   console.log("bjhavdj")
         res.status(500).json(err);
     }
 })
 
  



module.exports = router;