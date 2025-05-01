const mongoose = require("./db.model")
const Schema = mongoose.Schema;
const EventModelSchema = new Schema({
    age: {
        type: String,
        enum: [
            'גנים',
            'א-ד',
            'ה-ח',
            'תיכון',
            'סמינר',
            'נשים',
            'גיל הזהב',
            'רב גילאי'
        ]
    },
    NumofParticipants: Number,
    date: Date,
    place: String,
    service: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    duration: Number,
    description: String,
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED_MANAGER', 'APPROVED_CLIENT', 'CANCELLED_MANAGER', 'CANCELLED_CLIENT', 'COMPLETED']
    }
});
module.exports = mongoose.model("Event", EventModelSchema);