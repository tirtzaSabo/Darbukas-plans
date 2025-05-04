import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  description: string;
}

const ServiceModelSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model<IService>("Service", ServiceModelSchema);







// const mongoose=require("./db.model")
// const Schema = mongoose.Schema;
// const ServiceModelSchema = new Schema({
//   description:String,
// });
// module.exports = mongoose.model("Service",ServiceModelSchema );