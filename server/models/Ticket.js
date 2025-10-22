const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  description: { type: String },
  status: { type: String, enum: ['recu','diagnostic','en_reparation','pret','termine'], default: 'recu' },
  price: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
  assignedTo: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
