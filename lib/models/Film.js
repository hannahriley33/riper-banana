// {
//   title: <title of film RS>,
//   studio: <studio _id RI>,
//   released: <4-digit year RN>,
//   cast: [{
//     role: <name of character S>,
//     actor: <actor _id RI>

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: [{
    role: {
      type: String
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});


module.exports = mongoose.model('Film', schema);