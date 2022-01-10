var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'minsu0418',
  database :'polol'
});

connection.connect();

class TeamDB{
  constructor(body){
    this.body = body;
  }
  Get_TeamName(){
    connection.query('SELECT TeamName FROM polol.team', (error, rows, fields) => {
      if(error) throw error;
      console.log('TeamName : ', rows);
      console.log(rows.length);
      // var arr_TeamName = new Array();
      // for(let i =0;i<rows.length;i++){
      //   arr_TeamName[i] = rows[i];
      // }

    })
  }
}


connection.end();

module.export = TeamDB;