const express = require('express');
const router = express.Router();
const controller = require('../controllers/deviceController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Allow any authenticated user to create and view devices
router.post('/', auth, controller.createDevice);
router.get('/', auth, controller.getDevices);
router.get('/:id', auth, controller.getDevice);
router.put('/:id', auth, role(['admin','employee']), controller.updateDevice);
router.delete('/:id', auth, role(['admin']), controller.deleteDevice);

module.exports = router;
