const express = require('express');
const {sendMessageToKommo, submitForm} = require("../controllers/request.controller");
const router = express.Router();

router.post('/send-message', sendMessageToKommo);
router.post('/submit-form-lvlx', submitForm);

module.exports = router;