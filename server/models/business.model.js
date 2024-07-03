const mongoose = require("./db.model")
const Schema = mongoose.Schema;
const BusinessModelSchema = new Schema({
    name:String,
    admin:{type: Schema.Types.ObjectId,ref:'User'}
});
module.exports = mongoose.model("Business", BusinessModelSchema);