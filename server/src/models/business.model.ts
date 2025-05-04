import mongoose, { Schema, Document } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  admin: mongoose.Types.ObjectId;
}

const BusinessModelSchema: Schema = new Schema({
  name: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IBusiness>("Business", BusinessModelSchema);





// import mongoose from "./db.model";
// const Schema = mongoose.Schema;
// const BusinessModelSchema = new Schema({
//     name:String,
//     admin:{type: Schema.Types.ObjectId,ref:'User'}
// });
// module.exports = mongoose.model("Business", BusinessModelSchema);