const mongoose = require("./db.model")
const Schema = mongoose.Schema;
const EventModelSchema = new Schema({
    age:Number,
    NumofParticipants:Number,
    date:Date,
    place:String,
    service:{type: Schema.Types.ObjectId,ref:'Service'},
    user:{type: Schema.Types.ObjectId,ref:'User'},
    Duration:Number,
    description:String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'passed']
    }
});
module.exports = mongoose.model("Event", EventModelSchema);