"use strict"

var mysql = require('mysql2');
var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'minsu0418',
  database :'polol',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


class PlayerDB{
  constructor(body){
    this.body = body;
  }

  async Get_PlayerInfo(){
    var arr_PlayerDB = new Array();

    connection.getConnection(function(err, connection){
      if(err) throw error;
      else{
        connection.query('SELECT * FROM polol.players', (error, rows, fields) => {
          console.log("welcom DB");
          if(error) throw error;

          for(let i =0;i < rows.length;i++){
            arr_PlayerDB[i] = rows[i];
          }
        })
        connection.release();  
      }
    })
    return await arr_PlayerDB;
  }
}


module.exports = PlayerDB;


