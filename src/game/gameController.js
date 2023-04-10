const gameService = require('./gameService');

const getDataControllerFunction = (req, res) => {
  gameService.getDataFromDBService()
    .then((gameDetails) => {
      res.send({ 
        "status": true, 
        "data": gameDetails 
      });
    })
    .catch((error) => {
      console.error(`Error retrieving game details: ${error.message}`);
      res.status(500).send({ 
        "status": false, 
        "message": "Error retrieving game details" 
      });
    });
};

const createGameControllerFunction = (req, res) => {
  gameService.createGameDBService(req.body)
    .then((status) => {
      if(status){
        res.send({ 
          "status": true, 
          "message": "details created successfully"
        });
      } else{
        res.send({ 
          "status": true, 
          "message": "error creating details"
        });
      }
    })
    .catch((error) => {
      console.error(`Error creating game details: ${error.message}`);
      res.status(500).send({ 
        "status": false, 
        "message": "Error creating game details" 
      });
    });
};

const updateGameController = (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  gameService.updateGameDBService(req.params.id, req.body)
    .then((result) => {
      if (result) {
        res.send({ 
          "status": true, 
          "message": "Game Updated"
        });
      } else {
        res.send({ 
          "status": false, 
          "message": "Game Update Failed" 
        });
      }
    })
    .catch((error) => {
      console.error(`Error updating game details: ${error.message}`);
      res.status(500).send({ 
        "status": false, 
        "message": "Error updating game details" 
      });
    });
};

const deleteGameController = (req, res) => {
  console.log(req.params.id);

  gameService.removeGameDBService(req.params.id)
    .then(() => {
      res.send({ 
        "status": true, 
        "message": "Game Deleted"
      });
    })
    .catch((error) => {
      console.error(`Error deleting game details: ${error.message}`);
      res.status(500).send({ 
        "status": false, 
        "message": "Error deleting game details" 
      });
    });
};

module.exports = { 
  getDataControllerFunction, 
  createGameControllerFunction, 
  updateGameController, 
  deleteGameController 
};
