var EDU = require("../DataBase/ReadDB");

var EduData = async() => {
  var DB = new EDU();
  var Data = await DB.getTensor();
  console.log("EduData ON");

  for(let i = 0 ; i < Data.length ; i++){
    delete Data[i].Result;
    Data[i].KP = Data[i].KP.slice(0,-1);
    delete Data[i].Role;
    Data[i].Player = 1;
  }


  return Data;
}


module.exports = {Data : EduData};