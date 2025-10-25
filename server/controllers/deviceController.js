const Device = require('../models/Device');

exports.createDevice = async (req, res) => {
  try {
    const { type, client } = req.body;
    
    // Validation
    if (!type || !type.trim()) {
      return res.status(400).json({ message: 'Le type d\'appareil est requis' });
    }
    if (!client) {
      return res.status(400).json({ message: 'Le client est requis' });
    }
    
    const device = new Device(req.body);
    await device.save();
    // Populate client after save
    const populated = await Device.findById(device._id).populate('client');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate('client').sort({ createdAt: -1 });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDevice = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id).populate('client');
    if (!device) return res.status(404).json({ message: 'Appareil non trouvé' });
    res.json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appareil supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
