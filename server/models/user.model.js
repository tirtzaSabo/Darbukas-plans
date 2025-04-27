const mongoose = require("./db.model")
const Schema = mongoose.Schema;
const UserModelSchema = new Schema({
     name: String,phone:String, email: String, password: String,role: {
          type: String,
          enum: ['user', 'admin'],
          default: 'user'
        },token:String
});
module.exports = mongoose.model("User", UserModelSchema);