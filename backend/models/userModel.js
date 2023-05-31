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
      // Updated regular expression for email validation
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 4, // Changed to 'minlength' (lowercase 'l')
    maxlength: 100,
    select: false,
  },
  smokingHabit: {
    cigarettesPerDay: {
      type: Number,
      default: 0,
      match: [/^[0-9]+$/, 'Please enter only numbers'],
    },
    quitDate: {
      type: Date,
    },
    packageCost: {
      type: Number,
      default: 0,
    },
    cigarettesInPackage: {
      type: Number,
      default: 0,
      match: [/^[0-9]+$/, 'Please enter only numbers'],
    },
    startSmokingDate: {
      type: Date,
    },
    selectedCurrency: {
      type: String,
    },
  },
  goals: [
    {
      description: {
        type: String,
        required: true,
      },
      goalCost: {
        type:Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },

      targetDate: {
        type: Date,
        required: true,
        // Updated regular expression for date validation
        match: [
          /^\d{4}-\d{2}-\d{2}$/,
          'Please enter a valid date in the format YYYY-MM-DD',
        ],
      },

      achieved: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  spendedMoney: {
    type: Number,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;