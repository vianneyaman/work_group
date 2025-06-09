const mongoose = require('mongoose');

const reponseSchema = new mongoose.Schema({
  datetime: { type: String, required: true },
  nom: { type: String, required: true },
  email: { type: String },
  raison: { type: String, required: true },
  satisfaction: { type: String, required: true },
  service: { type: String, required: true },
  commentaire: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Reponse', reponseSchema);
