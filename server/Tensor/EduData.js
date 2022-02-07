var EDU = require("../DataBase/ReadDB");

var EduData = async() => {
  var DB = new EDU();
  var Data = await DB.getTensor();
  console.log("EduData ON");
  return Data;
}


module.exports = {Data : EduData};