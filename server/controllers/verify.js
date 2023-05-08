const jwt = require("jsonwebtoken");

module.exports.verifyToken = async(req, res, next) => {
    const token = req.cookies.authen;
    if(!token) {
        return res.status(401).json({message:"You are not authenticated"});
    }
    await jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if(err) {
            return res.status(403).json({message: "Invalid token"});
        }
        req.user = decoded;
        console.log(decoded);
        if (!req.user.isAdmin) {
            return res.status(401).json({message: "You are not authorized to access this resource"});
        }
        
        next();
    });
};
