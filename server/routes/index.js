const express = require('express');

const router = express.Router();
const ctrl = require("./ctrl");

router.get('/', ctrl.output.home)
router.get('/playoff', ctrl.output.playoff);
router.get('/team', ctrl.output.team);
router.get('/players', ctrl.output.players);
router.get('/table', ctrl.output.rank);

router.post('/manage', ctrl.process.manage);
router.post('/table', ctrl.process.rank);
router.post('/players', ctrl.process.players);






module.exports = router;