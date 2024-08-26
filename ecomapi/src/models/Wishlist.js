const mongoose = require("mongoose")
const WishlistSchema = new mongoose.Schema(
    {
      userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
            // unique:true,
        },
       products:[
        {
            productId:{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        },

       ]},
   {timestamps:true}
)
module.exports = mongoose.model("Wishlist",WishlistSchema);