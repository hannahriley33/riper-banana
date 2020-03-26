// {
//   name: <name RS>,
//   dob: <date-of-birth D>,
//   pob: <place-of-birth S>
// }

const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  pob: {
    type: String
  }
});



module.exports = mongoose.model('Actor', schema);

