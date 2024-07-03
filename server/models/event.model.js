const mongoose = require("./db.model")
const Schema = mongoose.Schema;
const EventModelSchema = new Schema({
    date:Date,
    place:String,
    service:{type: Schema.Types.ObjectId,ref:'Service'},
    user:{type: Schema.Types.ObjectId,ref:'User'},
    Duration:Number
});
module.exports = mongoose.model("Event", EventModelSchema);