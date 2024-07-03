
require('dotenv').config()
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB  = process.env.DATABASE_URL;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}
module.exports = mongoose;