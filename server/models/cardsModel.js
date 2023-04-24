const mongoose = require("mongoose");

const CardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lessons",
        }
    }
)

module.exports = mongoose.model("Cards", CardSchema);