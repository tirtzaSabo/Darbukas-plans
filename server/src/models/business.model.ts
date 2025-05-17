import mongoose, { Schema, Document } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  admin:string;
  // admin: mongoose.Types.ObjectId;
  phone: string;
  email: string;
  address: string;
}

const BusinessModelSchema: Schema = new Schema({
  name: { type: String, required: true },
    admin: { type: String, required: true },
  // admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  address: { type: String, required: true },
});

export default mongoose.model<IBusiness>("Business", BusinessModelSchema);
