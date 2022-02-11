var EDU = require("../DataBase/ReadDB");

var EduData = async() => {
  var DB = new EDU();
  var DB22Sp = await DB.get22Sp_Split();
  var DB21Sp = await DB.get21Sp_Split();
  var DB21Su = await DB.get22Su_Split();
  
  console.log("EduData ON");

  for(let i of DB22Sp.length){
    delete DB22Sp[i].Result;
    DB22Sp[i].KP = DB22Sp[i].KP.slice(0,-1);
    delete DB22Sp[i].Role;
    if(DB22Sp[i].Player !== "Faker"){
      delete DB22Sp[i];
    }
  }

  for(let i of DB21Sp.length){
    delete DB21Sp[i].Result;
    DB21Sp[i].KP = DB21Sp[i].KP.slice(0,-1);
    delete DB21Sp[i].Role;
    if(DB21Sp[i].Player !== "Faker"){
      delete DB21Sp[i];
    }
  }

  for(let i of DB21Su.length){
    delete DB21Su[i].Result;
    DB21Su[i].KP = DB21Su[i].KP.slice(0,-1);
    delete DB21Su[i].Role;
    if(DB21Su[i].Player !== "Faker"){
      delete DB21Su[i];
    }
  }

  var Data = Object.assign(DB22Sp, DB21Sp, DB21Su);

  return Data;
}


module.exports = {Data : EduData};