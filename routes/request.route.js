const express = require('express');
const {sendMessageToKommo} = require("../controllers/request.controller");
const router = express.Router();

router.post('/send-message', sendMessageToKommo);

module.exports = router;