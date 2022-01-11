const express = require('express');
const app = express();
const api = require("./routes/index");
const cors = require('cors');

app.use(cors());
app.use (express.json());
app.use('/', api);

module.exports = app;
