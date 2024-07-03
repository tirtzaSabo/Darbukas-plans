const mongoose=require("./db.model")
const Schema = mongoose.Schema;
const ServiceModelSchema = new Schema({
  description:String,
  audience:String,
  price:Number,
});
module.exports = mongoose.model("Service",ServiceModelSchema );