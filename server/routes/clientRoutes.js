const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role(['admin','employee']), controller.createClient);
router.get('/', controller.getClients);
router.get('/:id', controller.getClient);
router.put('/:id', auth, role(['admin','employee']), controller.updateClient);
router.delete('/:id', auth, role(['admin']), controller.deleteClient);

module.exports = router;
