const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticketController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, controller.createTicket);
router.get('/', auth, controller.getTickets);
router.get('/:id', auth, controller.getTicket);
router.put('/:id', auth, role(['admin','employee']), controller.updateTicket);
router.delete('/:id', auth, role(['admin']), controller.deleteTicket);

module.exports = router;
