const express = require('express');
const router = express.Router();

const blockedExtensionRouter = require('./blockedExtension.router');
const fileRouter = require('./file.router.js');

router.use('/', [
    blockedExtensionRouter,
    fileRouter,
]);

module.exports = router;