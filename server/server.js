const express = require('express');
const app = express();
const api = require("./routes/index");
const cors = require('cors');
const mysql = require('mysql2');

app.use(cors());
app.use (express.json());
app.use('/', api);

const connection = mysql.createConnection({
  host: '192.168.35.211',
  user: 'POLOL',
  password: 'polol',
  database :'polol'
});

app.get('/data', (req, res) => {
  connection.query('SELECT * from polol.coach', (error, rows) => {
    if(error) throw error;
    console.log('TeamName : ', rows);
    console.log(rows.length);

    var arr_TeamName = new Array();
      for(let i =0;i<rows.length;i++){
        arr_TeamName[i] = rows[i];
      }
    res.send({arr_TeamName});
  });
});

module.exports = app;