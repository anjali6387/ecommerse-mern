const CryptoJS = require("crypto-js");
const envfile = require("dotenv");
envfile.config();

const encryptPassword = (password)=>{
    return CryptoJS.AES.encrypt(password, process.env.SEC_PASS_KEY).toString();
    
}

const decryptPassword =  (encryptedPassword)=>{
    var bytes  = CryptoJS.AES.decrypt(encryptedPassword, process.env.SEC_PASS_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);

}

module.exports = {encryptPassword,
                 decryptPassword
                 }
