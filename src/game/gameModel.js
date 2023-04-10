const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: [
    {
      validator(value) {
      return validator.isLength(value, { max: 100 });
      },
      message: 'Name must be no longer than 100 characters'
    }
]
},
  date: {
    type: String,
    required: true,
    validate: {
      validator(dateString) {
      return moment(dateString, 'YYYY-MM-DD', true).isValid();
    },
    message: 'Date must be in YYYY-MM-DD format'  
    }
    },
  description: {
    type: String,
    required: true,
    validate: [validator.isLength, { max: 10000 }]
  }
});

module.exports = mongoose.model('game', gameSchema);