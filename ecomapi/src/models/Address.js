// const mongoose = require("mongoose")
// const AddressSchema = new mongoose.Schema(
//     {
//       userId:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required:true,
//         },

//         name: {
//             type: String,
//             required: true,
//           },
//           mobileNumber: {
//             type: String,
//             required: true,
//             // trim: true,
//           },
//           pinCode: {
//             type: String,
//             required: true,
//             // trim: true,
//           },
//           locality: {
//             type: String,
//             required: true,
//             // trim: true,

//           },
//           address: {
//             type: String,
//             required: true,
//             // trim: true,

//           },
//           cityDistrictTown: {
//             type: String,
//             required: true,
//             // trim: true,
//           },
//           state: {
//             type: String,
//             required: true,
//           },
//           landmark: {
//             type: String,
//           },
//           alternatePhone: {
//             type: String,
//           },
//         //   addressType: {
//         //     type: String,
//         //     required: true,
//         //     enum: ["home", "work"],
//         //     required: true,
//         //   },
//     },

//     {timestamps:true}
// )

// module.exports = mongoose.model("Address",AddressSchema);