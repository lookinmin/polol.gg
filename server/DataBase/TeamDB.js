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
  static Get_TeamInfo(){
    connection.query('SELECT * FROM polol.team', (error, rows, fields) => {
      if(error) throw error;
      console.log('TeamName : ', rows);
      console.log(rows.length);
 
      var arr_TeamName = new Array();
      for(let i =0;i<rows.length;i++){
        arr_TeamName[i] = rows[i].TeamName;
      }

      return arr_TeamName                                                                                                                                                                                                                                                                                                                                                  
    })
  }

  static Get_Team
}


connection.end();

module.export = TeamDB;