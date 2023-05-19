const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  smokingHabit: {
    cigarettesPerDay: {
      type: Number,
      default: 0
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
      default: 0
    },
  },
  goals: [{
    description: {
      type: String,
      required: true
    },
    targetDate: {
      type: Date,
      required: true
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