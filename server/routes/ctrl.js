console.log("server/routes/ctrl");
const axios = require("axios");
const cheerio = require("cheerio");

const output = {
  main: (req, res) => {
    const date = {
      data1: "hello world"
    }

    res.send({helle: date});
  }
};

module.exports = {output};