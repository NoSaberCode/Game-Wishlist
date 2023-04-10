const GameModel = require('./gameModel');

// object destructuring
module.exports = {
  getDataFromDBService() {
    return GameModel.find({})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  },

  createGameDBService(gameDetails) {
    const gameModelData = new GameModel(gameDetails);
    return gameModelData.save()
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },

  updateGameDBService(id, gameDetails) {
    return GameModel.findByIdAndUpdate(id, gameDetails)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  },

  removeGameDBService(id) {
    return GameModel.findByIdAndDelete(id)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
};