const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
   updatedAt: {
    type: Date,
    default: Date.now,
  }, 
});

// Экспортируем модель с явным указанием коллекции 'notes'
module.exports = mongoose.model('Note', NoteSchema, 'notes');