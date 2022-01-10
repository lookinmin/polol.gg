var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'minsu0418',
  database :'polol'
});

connection.connect();

connection.query('SELECT * from polol.coach', (error, rows, fields) => {
  if(error) throw error;
  console.log('Name : ', rows);
})

// class GetTeamInfo{
//   constructor(body){
//   this.body = body;
//   }

// }

connection.end();