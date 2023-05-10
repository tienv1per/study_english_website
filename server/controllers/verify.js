const jwt = require("jsonwebtoken");

module.exports.verifyToken = async(req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({message:"You are not authenticated"});
    }
    await jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if(err) {
            return res.status(403).json({message: "Invalid token"});
        }
        req.user = decoded;

        if (!req.user.isAdmin) {
            return res.status(401).json({message: "You are not authorized to access this resource"});
        }
        
        next();
    });
};
