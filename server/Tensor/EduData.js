var EDU = require("../DataBase/ReadDB");

var EduData = async() => {
  var DB = new EDU();
  var Data = await DB.getTensor2();
  console.log("EduData ON");

  for(let i of Data.length){
    delete Data[i].Result;
    Data[i].KP = Data[i].KP.slice(0,-1);
    delete Data[i].Role;
  }

  return Data;
}


module.exports = {Data : EduData};