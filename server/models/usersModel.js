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
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        learnedLesson: [
            {
                id: {type: mongoose.Schema.Types.ObjectId,
                ref: "Lessons"},
                lessonName: String,
            }
        ],
    }, 
    {timestamp: true}
)

module.exports = mongoose.model("Users", UserSchema);