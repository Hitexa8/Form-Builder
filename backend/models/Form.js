const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'email', 'password', 'number', 'date'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  position: {
    type: Number,
    required: true,
  },
}, { _id: false });

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  inputs: [inputSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Form', formSchema);
