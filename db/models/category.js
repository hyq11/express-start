var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    categoryName: { type: String }
  })
  
var categoryModel = mongoose.model('categories', CategorySchema)

module.exports =  categoryModel
  