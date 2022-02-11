var EDU = require("../DataBase/ReadDB");
var ML_MID = require("./ML/MID");

var EduData = async() => {
  var DB = new EDU();
  var DB22Sp = await DB.get22Sp();
  var DB21Sp = await DB.get21Sp();
  var DB21Su = await DB.get22Su();
  
  console.log("EduData ON");

  console.log(typeof(DB22Sp));

  for(let i of DB22Sp){
    delete i.Result;
    i.KP =i.KP.slice(0,-1);
  }

  for(let i of DB21Sp){
    delete i.Result;
    i.KP =i.KP.slice(0,-1);
  }

  for(let i of DB21Su){
    delete i.Result;
    i.KP =i.KP.slice(0,-1);
  }
  var Data = [];
  Data = Data.concat(DB21Sp, DB21Su);


  ML_MID(Data);
  return Data;
}


module.exports = {Data : EduData};