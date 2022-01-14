console.log("server/routes/ctrl");
const Player21Spring = require("../DataBase/Player21Spring");
const Player21Summer = require("../DataBase/Player21Summer");
const Team21Spring = require("../DataBase/Team21Spring");
const Team21Summer = require("../DataBase/Team21Summer");

const output = {
  main: (req, res) => {
    res.send({
      Player21Spring: Player21Spring.player21SpringData,
      Player21Summer: Player21Summer.player21SummerData,
      Team21Spring: Team21Spring.team21SpringData,
      Team21Summer: Team21Summer.team21SummerData 
    });
  }
};

module.exports = { output };