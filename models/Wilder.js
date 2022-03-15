const mongoose = require('mongoose');

// create wilder

const Schema = mongoose.Schema;
const WilderSchema = new Schema({
  name: { type: String, unique: true, required: true },
  city: String,
  profilePicture: String,
  skills: [{ title: String, votes: Number }],
});

module.exports = mongoose.model('wilder', WilderSchema);
