const mongoose = require('mongoose');

// Contact Schema
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pass the Schema into Mongoose to use as our model
const Contact = mongoose.model('Contact', contactSchema);

// Export it so that we can use the model in our App
module.exports = Contact;
