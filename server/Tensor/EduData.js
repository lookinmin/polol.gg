var EDU = require("../DataBase/ReadDB");

var EduData = async() => {
  var DB = new EDU();
  var Data = await DB.getTensor();
  console.log("EduData ON");

  for(let i = 0 ; i < Data.length ; i++){
    delete Data[i].Result;
  }

  return Data;
}


module.exports = {Data : EduData};