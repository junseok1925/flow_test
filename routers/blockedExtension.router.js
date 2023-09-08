const express = require('express');
const router = express.Router();
const BlockedExtensionController = require('../controllers/blockedExtension.controller');

router.get('/extension', BlockedExtensionController.getAllExtensions);
router.post('/extension', BlockedExtensionController.addExtension);
router.delete('/extension/:id', BlockedExtensionController.deleteExtension);

module.exports = router;
