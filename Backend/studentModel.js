import mongoose from "mongoose";

// Schema creation

var studentSchema = mongoose.Schema({
  sname: String,
  sage: Number,
  splace: String
});

// var studentModel = mongoose.model('collection name', schemaName)

var stdModel = mongoose.model('student', studentSchema);

export default stdModel;