const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  fullName: {type:String, required:true},
  title: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },    // scheduled date/time
  roomId: { type: String },                // 100ms room id (from API)
  createdAt: { type: Date, default: Date.now },
});

const classModel = mongoose.model("Class" , ClassSchema);

module.exports = classModel;
