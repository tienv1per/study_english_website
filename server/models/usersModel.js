const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        learnedCard: [],
    }, 
    {timestamp: true}
)

module.exports = mongoose.model("Users", UserSchema);