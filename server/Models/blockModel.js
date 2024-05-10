const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  block: String,
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }] // Reference to Department model
});

module.exports = mongoose.model('Block', blockSchema);
