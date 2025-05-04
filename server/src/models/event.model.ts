import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  age?: 
    | "גנים"
    | "א-ד"
    | "ה-ח"
    | "תיכון"
    | "סמינר"
    | "נשים"
    | "גיל הזהב"
    | "רב גילאי";
  NumofParticipants?: number;
  date?: Date;
  place?: string;
  service?: string;
  user?: mongoose.Types.ObjectId;
  duration?: number;
  description?: string;
  status?:
    | "PENDING"
    | "APPROVED_MANAGER"
    | "APPROVED_CLIENT"
    | "CANCELLED_MANAGER"
    | "CANCELLED_CLIENT"
    | "COMPLETED";
}

const EventSchema: Schema = new Schema({
  age: {
    type: String,
    enum: [
      "גנים",
      "א-ד",
      "ה-ח",
      "תיכון",
      "סמינר",
      "נשים",
      "גיל הזהב",
      "רב גילאי",
    ],
  },
  NumofParticipants: { type: Number },
  date: { type: Date },
  place: { type: String },
  service: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  duration: { type: Number },
  description: { type: String },
  status: {
    type: String,
    enum: [
      "PENDING",
      "APPROVED_MANAGER",
      "APPROVED_CLIENT",
      "CANCELLED_MANAGER",
      "CANCELLED_CLIENT",
      "COMPLETED",
    ],
  },
});

export default mongoose.model<IEvent>("Event", EventSchema);




// const mongoose = require("./db.model")
// const Schema = mongoose.Schema;
// const EventModelSchema = new Schema({
//     age: {
//         type: String,
//         enum: [
//             'גנים',
//             'א-ד',
//             'ה-ח',
//             'תיכון',
//             'סמינר',
//             'נשים',
//             'גיל הזהב',
//             'רב גילאי'
//         ]
//     },
//     NumofParticipants: Number,
//     date: Date,
//     place: String,
//     service: String,
//     user: { type: Schema.Types.ObjectId, ref: 'User' },
//     duration: Number,
//     description: String,
//     status: {
//         type: String,
//         enum: ['PENDING', 'APPROVED_MANAGER', 'APPROVED_CLIENT', 'CANCELLED_MANAGER', 'CANCELLED_CLIENT', 'COMPLETED']
//     }
// });
// module.exports = mongoose.model("Event", EventModelSchema);