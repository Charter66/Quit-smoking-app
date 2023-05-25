const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    match: [/^[a-zA-Z\s.]+$/, 'The name must contain only letters'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxlength: 20,
    select: false,
  },
  smokingHabit: {
    cigarettesPerDay: {
      type: Number,
      default: 0,
      match: [/^[0-9]+$/, 'Please enter only numbers'],
    },
    quitDate: {
        type: Date
      },
      packageCost: {
        type: Number,
        default: 0
      },
      cigarettesInPackage:{
        type:Number,
        default: 0,
        match: [/^[0-9]+$/, 'Please enter only numbers'],
    }
  },
  goals: [{
    description: {
      type: String,
      required: true
    },
    targetDate: {
      type: Date,
      required: true,
      match: [/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, 'Please enter valid date'],
    },
    achieved: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;