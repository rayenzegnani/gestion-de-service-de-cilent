const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Allow any authenticated user to create and view clients
router.post('/', auth, controller.createClient);
router.get('/', auth, controller.getClients);
router.get('/:id', auth, controller.getClient);
router.put('/:id', auth, role(['admin','employee']), controller.updateClient);
router.delete('/:id', auth, role(['admin']), controller.deleteClient);

module.exports = router;
