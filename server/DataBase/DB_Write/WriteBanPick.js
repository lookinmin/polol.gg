console.log('WriteBanPick');
const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require('mysql2');
const port = require('../port/pololPort');



const getAllBanChampions = async () => {
  try {
    return await axios.get('https://gol.gg/tournament/tournament-picksandbans/LCK%20Spring%202022/');
  } catch (error) {
    console.log(error);
  }
}

getAllBanChampions()
  .then((res) => {
    const $ = cheerio.load(res.data);
    var banChampList = [];

    for (let i = 1; i <= $(`table.table_list > tbody > tr:nth-child(3)
     > td:nth-child(2) > span`).length; i++) {
      banChampList.push({
        name: $(`table.table_list > tbody > tr:nth-child(3)
        > td:nth-child(2) > span:nth-child(${i}) > a > img`).attr('alt'),
        ban: ($(`table.table_list > tbody > tr:nth-child(3)
        > td:nth-child(2) > span:nth-child(${i})`).text()).replace(/[^0-9]/g,'')
      });
    }
    
  })
  .then(() => {
    
  })