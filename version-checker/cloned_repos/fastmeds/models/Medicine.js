const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  itemType: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;