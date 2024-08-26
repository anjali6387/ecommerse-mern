const mongoose = require("mongoose")
const CartSchema = new mongoose.Schema(
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
            quantity:{type:Number,default:1,},
            color:{type:String},
            size:{type:String},
        },

       ]

    },

    {timestamps:true}
)

module.exports = mongoose.model("Cart",CartSchema);