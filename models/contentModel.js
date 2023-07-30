const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroNavitems: { type: Array, required: true },
  heroButtonText: { type: String, required: true },
  heroTextColor: { type: String, required: true },

  contentTextHeader: { type: String, required: true },
  contentText: { type: String, required: true },
  contentButtonOne: { type: String, required: true },
  contentButtonTwo: { type: String, required: true },
  contentImageOne: { type: String, required: true },
  contentImageTwo: { type: String, required: true },
  contentImageThree: { type: String, required: true },

  contentScheduleText: { type: Array, required: true },
  contentScheduleImage: { type: Array, required: true },
  contentScheduleDate: { type: Array, required: true },
});

module.exports = mongoose.model('Content', contentSchema);
