const mongoose = require("mongoose");

const mbModelData = new mongoose.Schema({
    mbClass: { type: String, required: true },
    mbModel: { type: String,  required: true },
  });
  
  const mbClassModel = mongoose.model("mbClassAndModel", mbModelData);
  module.exports = mbClassModel

  