const mongoose = require('mongoose');

const LearnedSchema = mongoose.Schema(
    {
        userId,
        lessonId,
        learnedCards: []
    }
)

module.exports = mongoose.model("Learned", LearnedSchema);