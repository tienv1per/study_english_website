const jwt = require("jsonwebtoken");
const createError = require("./error");

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.ditmetoken;
    if(!token) {
        return next(createError(401, "You are not authenticated"));
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if(err) {
            return next(createError(403, "Invalid token"));
        }
        req.user = user;
        next();
    })
}