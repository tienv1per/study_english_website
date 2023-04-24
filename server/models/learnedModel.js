const mongoose = require('mongoose');

const LearnedSchema = mongoose.Schema(
    {
        userId: String,
        lessonId: String,
        learnedCards: [],
    }
)

module.exports = mongoose.model("Learned", LearnedSchema);