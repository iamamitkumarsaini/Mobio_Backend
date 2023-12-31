const jwt = require("jsonwebtoken");
require("dotenv").config();


const authentication = (req,res,next) => {

    const token = req.headers.authentication?.split(" ")[1];

    if(token){
        const decoded = jwt.verify(token, process.env.secret_key, (err,decoded) => {
            if(decoded){

                if(req.url === "/add/cart" || req.url === "/get/user/cart"){
                    
                    const user_id = decoded._id;
                    req.body.user_id = user_id;
                    console.log("userID", user_id);

                    next()
                }
                
                else{
                    next()
                }
            }

            else{
                res.send({"message":"Please login first"});
            }
        })
    }

    else{
        res.send({"message":"Please login first"});
    }
}

module.exports = { authentication };