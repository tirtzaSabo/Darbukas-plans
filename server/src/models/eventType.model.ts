import mongoose, { Schema, Document } from "mongoose";

export interface IEventType extends Document {
  description: string;
}

const EventTypeModelSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model<IEventType>("EventType", EventTypeModelSchema);







// const mongoose=require("./db.model")
// const Schema = mongoose.Schema;
// const ServiceModelSchema = new Schema({
//   description:String,
// });
// module.exports = mongoose.model("Service",ServiceModelSchema );