const express = require('express');

const router = express.Router();
const ctrl = require("./ctrl");

router.get('/', ctrl.output.home)
router.get('/predict', ctrl.output.predict);
router.get('/table', ctrl.output.rank);
router.get('/team', ctrl.output.team);
router.get('/players', ctrl.output.players);


router.get("/data", ctrl.output.data);


module.exports = router;