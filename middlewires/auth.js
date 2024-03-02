
const jwt = require("jsonwebtoken");
function auth(req,res,next){
    try{
        const token = req.cookies.token;
        if(!token){
          return res.status(401).json({errorMessage: "unauthorised1"});
        }
        const verified = jwt.verify(token, "Supratik@18");
        // console.log(verified);
        req.user = verified.user;
        
        next();
    } catch(err){
        console.err(err);
        res.status(401).json({errorMessage: "unauthorised"});
    }
}
 
module.exports = auth;