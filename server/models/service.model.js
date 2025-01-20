const mongoose=require("./db.model")
const Schema = mongoose.Schema;
const ServiceModelSchema = new Schema({
  description:String,
});
module.exports = mongoose.model("Service",ServiceModelSchema );