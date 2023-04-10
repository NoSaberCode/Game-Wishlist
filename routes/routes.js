const express = require('express');

const router = express.Router();
const gameController = require('../src/game/gameController');

router.route('/game/getAll').get(gameController.getDataControllerFunction);

router.route('/game/create').post(gameController.createGameControllerFunction);

router.route('/game/update/:id').patch(gameController.updateGameController);

router.route('/game/delete/:id').delete(gameController.deleteGameController);

module.exports = router;
