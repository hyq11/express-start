var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolNo: { type: String, required: true, unique:true},
  age: { type:Number },
  sex: { type: Number },
  hobby: [String],
  info: { type: String},
  date: { type:Date, default: Date.now()}
})

var studentModel = mongoose.model('categories', studentSchema)
module.exports = {
  studentModel
}