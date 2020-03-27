  
const mongoose = require('mongoose');

// {
//   rating: <rating number 1-5 RN>,
//   reviewer: <review _id RI>
//   review: <review-text, max-length 140 chars RS>,
//   film: <film-id RI>
// }

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    maxlength: 140,
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
  
},  {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'actorId'
});
module.exports = mongoose.model('Review', schema);
