import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  token?: string;
}

const UserModelSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  token: {
    type: String,
  },
});

export default mongoose.model<IUser>("User", UserModelSchema);






// const mongoose = require("./db.model")
// const Schema = mongoose.Schema;
// const UserModelSchema = new Schema({
//      name: String,phone:String, email: String, password: String,role: {
//           type: String,
//           enum: ['user', 'admin'],
//           default: 'user'
//         },token:String
// });
// module.exports = mongoose.model("User", UserModelSchema);