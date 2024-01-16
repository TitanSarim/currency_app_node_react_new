const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  
  name:{
    type: String,
  },

  cnic:{
    type: Number,
  },

  currency:{
    type: String,
  },

  amount:{
    type: Number
  },
  totalamount:{
    type: Number
  },

  createdAt:{
    type: Date,
    default: Date.now
  },

  updatedAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Currency", currencySchema)