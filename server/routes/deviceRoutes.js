const express = require('express');
const router = express.Router();
const controller = require('../controllers/deviceController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role(['admin','employee']), controller.createDevice);
router.get('/', controller.getDevices);
router.get('/:id', controller.getDevice);
router.put('/:id', auth, role(['admin','employee']), controller.updateDevice);
router.delete('/:id', auth, role(['admin']), controller.deleteDevice);

module.exports = router;
