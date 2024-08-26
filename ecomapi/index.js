// console.log("helo")
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const envfile = require("dotenv");
const userRoute = require("./src/routes/user")
const authRoute = require("./src/routes/auth")
const productRoute = require("./src/routes/product")
const cartRoute = require("./src/routes/cart")
const orderRoute = require("./src/routes/order")
const wishlistRoute = require("./src/routes/wishlist")
const bodyParser = require('body-parser');
const app = express();
envfile.config();

app.use(express.urlencoded({ extended: true }));


    
// app.use(express.json());

mongoose.connect(
    process.env.DB_URL
    ).then(()=>{
        console.log("db connection successful")
    }).catch((err)=>{
       console.log(err);
    });

    // console.log(shop.users())
    

    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cors())
 

    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/products", productRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/wishlist", wishlistRoute);

    // app.post("/",(req,res)={

    // })
app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running on port")
})