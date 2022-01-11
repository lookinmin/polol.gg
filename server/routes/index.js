const express = require('express');
const router = express.Router();
const ctrl = require("./ctrl");

router.get('/qwer', ctrl.output.main);
module.exports = router;