// const express = require('express');
// const { verifyToken, verifyTokenAndAuthorization } = require('../middlewares/verifyToken');
// const { addAddress, getAddress } = require('../controller/address');
// const router = express.Router();


// exports.addAddress = (req, res) => {
//     //return res.status(200).json({body: req.body})
//     const { payload } = req.body;
//     if (payload.address) {
//       if (payload.address._id) {
//         UserAddress.findOneAndUpdate(
//           { user: req.user._id, "address._id": payload.address._id },
//           {
//             $set: {
//               "address.$": payload.address,
//             },
//           }
//         ).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           if (address) {
//             res.status(201).json({ address });
//           }
//         });
//       } else {
//         UserAddress.findOneAndUpdate(
//           { user: req.user._id },
//           {
//             $push: {
//               address: payload.address,
//             },
//           },
//           { new: true, upsert: true }
//         ).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           if (address) {
//             res.status(201).json({ address });
//           }
//         });
//       }
//     } else {
//       res.status(400).json({ error: "Params address required" });
//     }
//   };

// router.post('/user/address/create/:userId', verifyTokenAndAuthorization,(req,res)=>{
    
// });
// router.post('/user/getaddress', requireSignin, userMiddleware, getAddress);

// module.exports = router;