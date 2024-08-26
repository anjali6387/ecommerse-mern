const jwt = require("jsonwebtoken");
const envFile = require("dotenv")
envFile.config();

const generateAccessToken =  (user) => {
const token =  jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin,
    },process.env.ACCESS_SEC,
{expiresIn:"3d"})

return token;
}


module.exports = {generateAccessToken}