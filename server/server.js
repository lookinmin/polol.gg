const express = require('express');
const app = express();
const api = require("./routes/index");
const cors = require('cors');
const DB = require('./DataBase/ReadDB');

app.use(cors());
app.use (express.json());

app.use('/', api);

app.use('/data', async (req,res) => {
  const read = new DB();
  const write = await read.getSummer2021();
  res.send(write)
})


module.exports = app;