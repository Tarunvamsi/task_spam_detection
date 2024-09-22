const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.get('/contacts', contactController.listContacts);
router.post('/mark-spam', contactController.markAsSpam);
router.get('/search/name/:query', contactController.searchByName);
router.get('/search/phone/:phoneNumber', contactController.searchByPhone);

module.exports = router;
