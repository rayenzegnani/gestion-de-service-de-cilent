const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  try {
    const { client, device, description } = req.body;
    
    // Validation
    if (!client) {
      return res.status(400).json({ message: 'Le client est requis' });
    }
    if (!device) {
      return res.status(400).json({ message: 'L\'appareil est requis' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'La description est requise' });
    }
    
    const ticket = new Ticket(req.body);
    await ticket.save();
    // Mongoose populate after save
    const populated = await Ticket.findById(ticket._id).populate('client device');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('client device').sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('client device');
    if (!ticket) return res.status(404).json({ message: 'Ticket non trouvé' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('client device');
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
