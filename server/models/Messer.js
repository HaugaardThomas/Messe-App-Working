const mongoose = require('mongoose');

const messeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    required: false
  },
  video: {
    type: String, 
    required: false
  }
}, 
{
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Messe', messeSchema);
